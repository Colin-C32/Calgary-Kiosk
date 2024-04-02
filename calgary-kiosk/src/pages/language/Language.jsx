.language-selection-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #00337E;
    border-radius: 10px;
    background-color: #F5F6FF;
    padding: 20px;
    width: 80%;
    margin: 20px auto;
  }
  
  .header {
    display: flex;
    align-items: center;
    color: #00337E;
    font-size: 35px;
    font-weight: 700;
    width: 100%;
  }
  
  .back-arrow {
    cursor: pointer;
    margin-right: 10px;
  }
  
  .title {
    text-align: center;
    width: 100%;
  }
  
  .languages-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 20px;
    width: 100%;
  }
  .selected-button {
    background-color: #2422aa !important;
    color: rgb(255, 255, 255) !important;
  }
  
  
  .languages-grid button {
    padding: 12px;
    margin: 8px;
    border: 1px solid var(--dark-blue);
    border-radius: 10px;
    background-color: var(--dark-blue-faded);
    color: var(--dark-blue);
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 8px var(--dark-blue-shadow);
    
  }
  
  .footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 40px;
    gap: 20px;
  }
  
  .cancel-button{
    width: 80%;
    padding: 12px;
    border: 1px solid var(--dark-blue);
    border-radius: 10px;
    color: white;
    background-color: var(--dark-red-faded);
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 8px var(--dark-black-shadow);
  }
  .confirm-button {
    width: 80%;
    padding: 12px;
    border: 1px solid var(--dark-blue);
    border-radius: 10px;
    color: white;
    background-color: var(--dark-green-faded);
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 8px var(--dark-black-shadow);
  }
  
  .cancel-button {
    color: var(--red);
    background-color: var(--red-faded);
    border: 1px solid var(--red);
    box-shadow: 0 4px 8px var(--red-shadow); /* Red */
  }
  
  .confirm-button {
    color: var(--green);
    background-color: var(--green-faded);
    border: 1px solid var(--green);
    box-shadow: 0 4px 8px var(--green-shadow); /* Green */
  }
  
