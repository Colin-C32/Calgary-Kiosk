import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import "./PointsOfInterest.css";
import { Taskbar } from "../../components/taskbar/Taskbar";
import { Header } from "../../components/UI/Header";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsRailwayIcon from "@mui/icons-material/DirectionsRailway";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import Slider from "@mui/material/Slider";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const GOOGLE_API_KEY = "AIzaSyDywEmVrxAsXW4uDgQUSn3xZlQxkbC8syM";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 51.04680038121731,
  lng: -114.07242089509964,
};

const data = {
  shoppingDining: [
    { name: "Stephen Avenue Walk", distance: 0.18, lat: 51.0458969, lng: -114.0702167 },
    { name: "Calgary Farmers' Market South", distance: 6.98, lat: 50.9854596, lng: -114.0517599 },
    { name: "Inglewood", distance: 3.92, lat: 51.034201, lng: -114.020136 },
    { name: "Kensington Village II", distance: 2.66, lat: 51.0528608, lng: -114.1092064 },
    { name: "Eau Claire Market", distance: 0.7, lat: 51.0525998, lng: -114.0684482 },
    { name: "CF Chinook Centre", distance: 5.38, lat: 50.9984961, lng: -114.0733449 },
    { name: "CrossIron Mills", distance: 18.27, lat: 51.203132, lng: -113.99348 },
    { name: "East Village", distance: 1.53, lat: 51.0463759, lng: -114.0505705 },
    { name: "CORE Shopping Centre", distance: 0.25, lat: 51.04600989999999, lng: -114.0691417 },
    { name: "17th Ave Business Improvement Area", distance: 1.12, lat: 51.0384237, lng: -114.0812688 },
  ],
  entertainment: [
    { name: "Studio Bell, home of the National Music Centre", distance: 1.41, lat: 51.0445506, lng: -114.0525973 },
    { name: "The GRAND", distance: 0.51, lat: 51.0471659, lng: -114.0651156 },
    { name: "Calgary Zoo", distance: 2.93, lat: 51.0450054, lng: -114.0306976 },
    { name: "TELUS Spark Science Centre", distance: 3.45, lat: 51.0538889, lng: -114.0244446 },
    { name: "Glenbow Museum", distance: 0.82, lat: 51.0449777, lng: -114.0611335 },
    { name: "Fort Calgary", distance: 2, lat: 51.044625, lng: -114.04403 },
    { name: "The Military Museums", distance: 4.81, lat: 51.0138755, lng: -114.1168785 },
    { name: "Heritage Park", distance: 7.44, lat: 50.9824547, lng: -114.1009544 },
    { name: "Calgary Tower", distance: 0.71, lat: 51.04430800000001, lng: -114.0630914 },
    { name: "Stampede Park", distance: 1.76, lat: 51.0374488, lng: -114.0520858 },
  ],
  outdoors: [
    { name: "Fish Creek Provincial Park", distance: 15.33, lat: 50.9147128, lng: -114.0107697 },
    { name: "Nose Hill Park", distance: 7.69, lat: 51.1114337, lng: -114.1112986 },
    { name: "Prince's Island Park", distance: 0.99, lat: 51.0556, lng: -114.0702533 },
    { name: "Bow River Pathway", distance: 3.34, lat: 51.0476201, lng: -114.1201058 },
    { name: "Calaway Park", distance: 20.3, lat: 51.0854398, lng: -114.3559887 },
    { name: "St. Patrick's Island", distance: 2.17, lat: 51.04719919999999, lng: -114.0414476 },
    { name: "Sikome Lake", distance: 16.88, lat: 50.899444, lng: -114.015556 },
    { name: "Edworthy Park", distance: 6.66, lat: 51.0620527, lng: -114.1644059 },
  ],
  cultureHistory: [
    { name: "The Hangar Flight Museum", distance: 6.71, lat: 51.09436179999999, lng: -114.0133997 },
    { name: "Canadian Sports Hall of Fame", distance: 11.24, lat: 51.08358399999999, lng: -114.2220499 },
    { name: "Youthlink Calgary Police Service Interpretive Centre", distance: 9.24, lat: 51.09852910000001, lng: -113.9690713 },
    { name: "Glenbow Museum", distance: 0.82, lat: 51.0449777, lng: -114.0611335 },
    { name: "Southern Alberta Jubilee Auditorium", distance: 2.26, lat: 51.0628664, lng: -114.0921023 },
    { name: "Leighton Art Centre", distance: 29.63, lat: 50.7956657, lng: -114.2123565 },
    { name: "Calgary Chinese Cultural Centre", distance: 0.7, lat: 51.0512849, lng: -114.0654657 },
    { name: "Lougheed House National & Provincial Historic Site", distance: 0.77, lat: 51.0405556, lng: -114.0772222 },
  ],
};

const libraries = ["places", "geometry"];

const PointsOfInterest = ({ setPage }) => {
  const [location, setLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [search_query, setSearchQuery] = useState("");
  const [search_results, setSearchResults] = useState([]);
  const [travel_mode, setTravelMode] = useState("TRANSIT");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const map_ref = useRef(null);

  const [activeFilters, setActiveFilters] = useState({
    shoppingDining: true,
    entertainment: false,
    outdoors: false,
    cultureHistory: false,
  });
  const [distanceRange, setDistanceRange] = useState([0, 50]);

  const updateDirections = async (loc) => {
    const directionsService = new window.google.maps.DirectionsService();

    const result = await directionsService.route({
      origin: center,
      destination: location,
      travelMode: travel_mode, // Use the state value
    });
    setDirections(result);
  };

  const clearDirections = () => {
    setDirections(null);
  };

  useEffect(() => {
    if (location) {
      updateDirections(location);
    } else {
      clearDirections();
    }
  }, [location, travel_mode]);

  const valueLabelFormat = (value) => {
    return `${value} km`;
  };

  const updateSearchResults = (query) => {
    const service = new window.google.maps.places.PlacesService(
      map_ref.current
    );

    const request = {
      location: center,
      radius: "5000",
      query,
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const filteredResults = results
          .map((result) => ({
            ...result,
            distance:
              window.google.maps.geometry.spherical.computeDistanceBetween(
                new window.google.maps.LatLng(center),
                result.geometry.location
              ) / 1000, // Distance in kilometers
          }))
          .filter((r) => r.distance < 500);

        setSearchResults(filteredResults);
      }
    });
  };

  const toggleFilter = (category) => {
    setActiveFilters({
      ...activeFilters,
      [category]: !activeFilters[category],
    });
  };

  // Function to handle distance slider change
  const handleDistanceChange = (event, newValue) => {
    setDistanceRange(newValue);
  };

  useEffect(() => {
    if (search_query) {
      updateSearchResults(search_query);
      setLocation(null);
    } else {
    }
  }, [search_query]);

  const selectLocation = (loc) => {
    const lat = loc.lat();
    const lng = loc.lng();
    setSearchQuery("");
    console.log("Latitude: " + lat);
    console.log("Longitude: " + lng);
    setLocation({ lat, lng });
  };

  const onMapLoad = useCallback((map) => {
    map_ref.current = map;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="points-of-interest-page">
      <Header
        setPage={setPage}
        previousPage="Home"
        title="Points of Interest"
      />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={search_query}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.blur(); // This will cause the input to lose focus
              e.preventDefault();
            }
          }}
        />
        <div className="search-bar-icon">
          <SearchOutlinedIcon />
        </div>
        {isDropdownVisible && (
          <div className="search-bar-results">
            {search_results.length > 0 ? (
              search_results.slice(0, 5).map((place, index) => (
                <button
                  key={index}
                  onClick={() => {
                    selectLocation(place.geometry.location);
                  }}
                >
                  <span>{place.name}</span>
                  <span>{place.distance.toFixed(2)} km</span>
                </button>
              ))
            ) : (
              <span className="search-bar-empty">Search for results...</span>
            )}
          </div>
        )}
      </div>
      <div className="google-map" style={{ height: 200 }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          center={center}
          zoom={10}
          onClick={(event) => selectLocation(event.latLng)}
          onLoad={onMapLoad}
        >
          {location && <Marker position={location} />}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "#ff2527",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                },
                markerOptions: { visible: false },
              }}
            />
          )}
        </GoogleMap>
      </div>
      <div className="bottom-of-page">
        <div className="map-directions-actions">
          <div className="map-directions-mode">
            <button
              className={travel_mode === "WALKING" ? "active-mode" : ""}
              onClick={() => setTravelMode("WALKING")}
            >
              <DirectionsRunIcon></DirectionsRunIcon>
            </button>
            <button
              className={travel_mode === "TRANSIT" ? "active-mode" : ""}
              onClick={() => setTravelMode("TRANSIT")}
            >
              <DirectionsRailwayIcon></DirectionsRailwayIcon>
            </button>
            <button
              className={travel_mode === "DRIVING" ? "active-mode" : ""}
              onClick={() => setTravelMode("DRIVING")}
            >
              <DirectionsCarIcon></DirectionsCarIcon>
            </button>
          </div>
          {location && (
            <button
              className="map-directions-close"
              onClick={() => setLocation(null)}
            >
              <CloseOutlinedIcon />
            </button>
          )}
        </div>

        <div className="filters">
          <div className="filters-title">Filters</div>
          <div className="checkboxGroup">
            <label
              className="label"
              onClick={() => toggleFilter("shoppingDining")}
            >
              <div className="checkbox">
                {activeFilters.shoppingDining ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </div>
              Shopping/Dining
            </label>
            <label
              className="label entertainment"
              onClick={() => toggleFilter("entertainment")}
            >
              <div className="checkbox">
                {activeFilters.entertainment ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </div>
              Entertainment
            </label>
          </div>
          <div className="checkboxGroup">
            <label className="label" onClick={() => toggleFilter("outdoors")}>
              <div className="checkbox">
                {activeFilters.outdoors ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </div>
              Outdoors
            </label>
            <label
              className="label"
              onClick={() => toggleFilter("cultureHistory")}
            >
              <div className="checkbox">
                {activeFilters.cultureHistory ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </div>
              Culture/History
            </label>
          </div>
          <div className="slider">
            <Slider
              value={distanceRange}
              onChange={handleDistanceChange}
              valueLabelDisplay="on" // Always show the value label
              aria-labelledby="range-slider"
              getAriaValueText={valueLabelFormat}
              valueLabelFormat={valueLabelFormat}
              min={0}
              max={50}
            />
          </div>
        </div>
        <div className="point-of-interest-results">
          {activeFilters.shoppingDining && (
            <>
              {data.shoppingDining.map((item) => {
                if (
                  item.distance < distanceRange[1] &&
                  item.distance > distanceRange[0]
                ) {
                  return (
                    <div
                      className="point-of-interest-result"
                      onClick={() => {
                        setLocation({ lat: item.lat, lng: item.lng });
                      }}
                    >
                      {item.name}
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </>
          )}
          {activeFilters.entertainment && (
            <>
              {data.entertainment.map((item) => {
                if (
                  item.distance < distanceRange[1] &&
                  item.distance > distanceRange[0]
                ) {
                  return (
                    <div
                      className="point-of-interest-result"
                      onClick={() => {
                        setLocation({ lat: item.lat, lng: item.lng });
                      }}
                    >
                      {item.name}
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </>
          )}{" "}
          {activeFilters.outdoors && (
            <>
              {data.outdoors.map((item) => {
                if (
                  item.distance < distanceRange[1] &&
                  item.distance > distanceRange[0]
                ) {
                  return (
                    <div
                      className="point-of-interest-result"
                      onClick={() => {
                        setLocation({ lat: item.lat, lng: item.lng });
                      }}
                    >
                      {item.name}
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </>
          )}
          {activeFilters.cultureHistory && (
            <>
              {data.cultureHistory.map((item) => {
                if (
                  item.distance < distanceRange[1] &&
                  item.distance > distanceRange[0]
                ) {
                  return (
                    <div
                      className="point-of-interest-result"
                      onClick={() => {
                        setLocation({ lat: item.lat, lng: item.lng });
                      }}
                    >
                      {item.name}
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </>
          )}
        </div>
      </div>
      <Taskbar setPage={setPage} />
    </div>
  );
};

export default PointsOfInterest;
