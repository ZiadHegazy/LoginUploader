import React, { useState, useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import OrangeInput from '../../util/OrangeInput/OrangeInput';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forcast = () => {
    const navigate=useNavigate()
    const [isManager, setIsManger] = useState('manager');
    const [activeStep, setActiveStep] = useState(0); // stepper active step
    const [isvalid, setIsValid] = useState(true); // validating the forecast
    const [FirmValid, setFirmValid] = useState(true); //validating the firm for accepting 2 decimal points
    const [TailValid, setTailValid] = useState(true); //validating the Tail for accepting 2 decimal points
    const [WorstValid, setWorstValid] = useState(true); //validating the Worst for accepting 2 decimal points
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedQuarter, setSelectedQuarter] = useState('');
    const [selectedMonths,setSelectedMonths]=useState([])
    const [submitedAddingData , setsubmitedAddingData] = useState([]);
    const handleSelectedQuarterChange=(e)=>{
        setSelectedQuarter(e.target.value)
        console.log(data.add[e.target.value])
        const months=data.add[e.target.value]
        setSelectedMonths(data.add[e.target.value]);
        var submitted=[]
        for(var i=0;i<months.length;i++){
            submitted.push({year:months[i][1],month:months[i][0],firm:"",tailwind:"",worstCase:""})
        }
        console.log(selectedMonths);
        setsubmitedAddingData(submitted)
        
    }
    const fetchData = async () => {
        try {
            const response = await fetch('http://10.238.119.26:8020/forecast');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const json = await response.json();
            setData(json);
            setIsLoading(false);
            var empty=true
            var keys=Object.keys(json.add)
            for(var i=0;i<keys.length;i++){
                if(data.add[keys[i]].length !=0){
                    empty=false
                    break;
                }
            }
            if(empty){
                navigate("/edit")
            }else{
                const months=json.add[keys[0]]
                setSelectedMonths(json.add[keys[0]]);
                setSelectedQuarter(keys[0])
                var submitted=[]
                for(var i=0;i<months.length;i++){
                    submitted.push({year:months[i][1],month:months[i][0],firm:"",tailwind:"",worstCase:""})
                }
                console.log(selectedMonths);
                setsubmitedAddingData(submitted)

            }

        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
        
    }, []);

    // storing forecast data
    const [ForecastData, setForecastData] = useState([{
        quarter: '',
        month: '',
        values:[]
    }]);

    // handling the stepeer next and previous
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // newForecastData = ForecastData.slice()
        // newForecastData
        

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // validation on the forecast data
    const handleVerifyForcast = (ForecastData) => {
        if (
            ForecastData.Tailwind > ForecastData.Firm &&
            ForecastData.Firm > ForecastData.Worstcase
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    // number validation for accepting 2 decimal points
    const handleFirmNumberChange = (event) => {
        const { name, value } = event.target;
        const regex = /^\d*(\.\d{1,2})?$/;

        if (regex.test(value)) {
            // oldValues=ForecastData.values
            // newValues=oldValues[activeStep]
            // setForecastData((prevForecastData) => ({
            //     ...prevForecastData,
            //     [name]: value,
            // }));
            var oldValues=[]
            for(var i=0;i<submitedAddingData.length;i++){
                oldValues.push(submitedAddingData[i])
            }
            oldValues[activeStep]["firm"]=value
            setsubmitedAddingData(oldValues)
            console.log(oldValues)
            setFirmValid(true);
        } else {
            setFirmValid(false);
        }
    };
    const handleTailNumberChange = (event) => {
        const { name, value } = event.target;
        const regex = /^\d*(\.\d{1,2})?$/;

        if (regex.test(value)) {
            // setForecastData((prevForecastData) => ({
            //     ...prevForecastData,
            //     [name]: value,
            // }));
            var oldValues=[]
            for(var i=0;i<submitedAddingData.length;i++){
                oldValues.push(submitedAddingData[i])
            }
            oldValues[activeStep]["tailwind"]=value
            setsubmitedAddingData(oldValues)
            console.log(oldValues)
            setTailValid(true);
        } else {
            setTailValid(false);
        }
    };
    const handleWorstNumberChange = (event) => {
        const { name, value } = event.target;
        const regex = /^\d*(\.\d{1,2})?$/;

        if (regex.test(value)) {
            // setForecastData((prevForecastData) => ({
            //     ...prevForecastData,
            //     [name]: value,
            // }));
            var oldValues=[]
            for(var i=0;i<submitedAddingData.length;i++){
                oldValues.push(submitedAddingData[i])
            }
            oldValues[activeStep]["worstCase"]=value
            setsubmitedAddingData(oldValues)
            console.log(oldValues)
            setWorstValid(true);
        } else {
            setWorstValid(false);
        }
    };

    // handle submit fucntion for submitting forecast
    const handleForcastSubmit = async (e) => {
        var toBeSubmit={data:{...submitedAddingData},quarter:selectedQuarter.substring(1)+"-"+submitedAddingData[0].year}
        console.log(toBeSubmit)
        let data = JSON.stringify(toBeSubmit);
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://10.238.119.26:8020/addforecast/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          await axios.request(config)
        e.preventDefault()
        // handleVerifyforecast(ForecastData);
    };
    if (isLoading) {
        return (
            <div className="flex justify-center flex-col items-center h-screen ">
                <CircularProgress sx={{ color: '#ff7900' }} />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {data && (
                <div className="flex justify-center mt-10 flex-col ">
                    <Box className="flex flex-col justify-center items-center mb-16">
                        <Card
                            sx={{
                                minWidth: 1200,
                                maxHeight: 300,
                                boxShadow: '0px 0px 6px #cccccc',
                                borderRadius: '20px',
                                marginBottom: '2%',
                            }}
                            className="rounded-2xl mr-3"
                        >
                            
                                <div className="px-4 mt-4 flex justify-around items-center flex-row">
                                    <Typography variant="h5" className="text-orange font-bold">
                                        New forecast
                                    </Typography>
                                </div>
                                <div className="flex justify-center mb-3">
                                    {selectedMonths.length === 1 ? (
                                        ' '
                                    ) : (
                                        <Stepper
                                            activeStep={activeStep}
                                            sx={{
                                                color: '#ff7900',
                                                width: '50%',
                                            }}
                                        >
                                            {selectedMonths.map((label) => {
                                                const stepProps = {};
                                                const labelProps = {};
                                                return (
                                                    <Step key={label}{...stepProps}>
                                                        <StepLabel {...labelProps}>
                                                            {label[0]+"-"+label[1]}
                                                        </StepLabel>
                                                    </Step>
                                                );
                                            })}
                                        </Stepper>
                                    )}
                                </div>
                                <CardContent className="flex flex-row justify-evenly">
                                    <Card
                                        sx={{
                                            minWidth: 100,
                                            boxShadow: '0px 0px 6px #cccccc',
                                            borderRadius: '20px',
                                        }}
                                        className="rounded-2xl"
                                    >
                                        <CardContent className="flex flex-col justify-evenly items-center">
                                            <Typography
                                                variant="p"
                                                className="text-orange font-bold"
                                            >
                                                Quarter
                                            </Typography>
                                            <select
                                                id="quarter"
                                                onChange={handleSelectedQuarterChange
                                                }
                                                value={selectedQuarter}
                                                className="
                                                        rounded-lg w-52 
                                                        h-7 text-center 
                                                        border-solid 
                                                        border-2
                                                        border-orange 
                                                        hover:bg-orange 
                                                        hover:text-white 
                                                        hover:shadow-orange
                                                        hover:shadow-lg
                                                        focus:outline-none"
                                            >
                                                <option
                                                    className="bg-white text-black"
                                                    value={'Select a quarter'}
                                                    disabled
                                                >
                                                    Select quarter
                                                </option>
                                                {Object.keys(data.add).map((item) => {
                                                    return (
                                                        <option
                                                            className="bg-white text-black"
                                                            key={item}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </CardContent>
                                    </Card>
                                    <Card
                                        sx={{
                                            minWidth: 100,
                                            boxShadow: '0px 0px 6px #cccccc',
                                            borderRadius: '20px',
                                        }}
                                        className="rounded-2xl mr-3"
                                    >
                                        <CardContent className="flex flex-col justify-evenly items-center">
                                            <Typography
                                                variant="p"
                                                className="text-orange font-bold"
                                            >
                                                Month
                                            </Typography>
                                            <Typography variant="p" className="text-gray">
                                                September
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                    <OrangeInput
                                        label="Firm (M &#8364; )"
                                        id="Firm"
                                        name="Firm"
                                        type="number"
                                        placeholder="Firm"
                                        step="any"
                                        value={submitedAddingData[activeStep]? submitedAddingData[activeStep].firm:""}
                                        onChange={handleFirmNumberChange}
                                        isvalid={FirmValid}
                                        tooltipTitle="Only maximum 2 decimal places is allowed"
                                    />
                                    <OrangeInput
                                        label="Tailwind (M &#8364; )"
                                        id="Tailwind"
                                        name="Tailwind"
                                        type="number"
                                        step="any"
                                        placeholder="Tailwind"
                                        value={submitedAddingData[activeStep]? submitedAddingData[activeStep].tailwind:""}
                                        onChange={handleTailNumberChange}
                                        isvalid={TailValid}
                                        tooltipTitle="only maximum 2 decimal places is alowed"
                                    />
                                    <OrangeInput
                                        label="Worstcase (M &#8364; )"
                                        id="Worstcase"
                                        name="Worstcase"
                                        type="number"
                                        step="any"
                                        placeholder="Worstcase"
                                        value={submitedAddingData[activeStep]? submitedAddingData[activeStep].worstCase:""}
                                        onChange={handleWorstNumberChange}
                                        isvalid={WorstValid}
                                        tooltipTitle="only maximum 2 decimal places is alowed"
                                    />
                                </CardContent>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pl: 1, pr: 1 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button
                                        onClick={
                                            activeStep === selectedMonths.length-1
                                                ? handleForcastSubmit
                                                : handleNext
                                        }
                                        type={
                                            activeStep === selectedMonths.length ? 'submit' : 'button'
                                        }
                                        sx={{
                                            color: '#ff7900',
                                        }}
                                    >
                                        {activeStep === selectedMonths.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                </Box>
                            
                        </Card>
                        {isManager === 'manager' ? (
                            <iframe
                                src="https://obs.msbi-portal-uat.equant.com/OBS-MSBI-PORTAL/powerbi/IB%20ANALYTICS%20HUB/Europe%20Reporting/Forecast%20Management?rs:embed=true"
                                title="EU Forecast Management Overview | Director View"
                                className="w-11/12 ml-9 h-screen"
                            ></iframe>
                        ) : (
                            <iframe
                                src="https://obs.msbi-portal-uat.equant.com/OBS-MSBI-PORTAL/powerbi/IB%20ANALYTICS%20HUB/Europe%20Reporting/Sales%20Team%20Forecast?rs:embed=true"
                                title="EU Forecast User OverView"
                                className="w-11/12 ml-9 h-screen"
                            ></iframe>
                        )}
                    </Box>
                </div>
            )}
        </div>
    );
};

export default Forcast;