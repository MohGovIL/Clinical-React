import React, {useState} from 'react';
import {StyledForm, StyledPatientDetails, StyledFormGroup, StyledDivider, StyledTextField} from './Style';
import {useTranslation} from 'react-i18next';
import Title from '../../../../Assets/Elements/Title';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useForm, Controller} from 'react-hook-form';
import {connect} from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    ExpandMore,
    ExpandLess,
} from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';

const PatientDetailsBlock = ({languageDirection}) => {
    const {t} = useTranslation();



    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
        { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
        { title: 'Casablanca', year: 1942 },
        { title: 'City Lights', year: 1931 },
        { title: 'Psycho', year: 1960 },
        { title: 'The Green Mile', year: 1999 },
        { title: 'The Intouchables', year: 2011 },
        { title: 'Modern Times', year: 1936 },
        { title: 'Raiders of the Lost Ark', year: 1981 },
        { title: 'Rear Window', year: 1954 },
        { title: 'The Pianist', year: 2002 },
        { title: 'The Departed', year: 2006 },
        { title: 'Terminator 2: Judgment Day', year: 1991 },
        { title: 'Back to the Future', year: 1985 },
        { title: 'Whiplash', year: 2014 },
        { title: 'Gladiator', year: 2000 },
        { title: 'Memento', year: 2000 },
        { title: 'The Prestige', year: 2006 },
        { title: 'The Lion King', year: 1994 },
        { title: 'Apocalypse Now', year: 1979 },
        { title: 'Alien', year: 1979 },
        { title: 'Sunset Boulevard', year: 1950 },
        { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
        { title: 'The Great Dictator', year: 1940 },
        { title: 'Cinema Paradiso', year: 1988 },
        { title: 'The Lives of Others', year: 2006 },
        { title: 'Grave of the Fireflies', year: 1988 },
        { title: 'Paths of Glory', year: 1957 },
        { title: 'Django Unchained', year: 2012 },
        { title: 'The Shining', year: 1980 },
        { title: 'WALL·E', year: 2008 },
        { title: 'American Beauty', year: 1999 },
        { title: 'The Dark Knight Rises', year: 2012 },
        { title: 'Princess Mononoke', year: 1997 },
        { title: 'Aliens', year: 1986 },
        { title: 'Oldboy', year: 2003 },
        { title: 'Once Upon a Time in America', year: 1984 },
        { title: 'Witness for the Prosecution', year: 1957 },
        { title: 'Das Boot', year: 1981 },
        { title: 'Citizen Kane', year: 1941 },
        { title: 'North by Northwest', year: 1959 },
        { title: 'Vertigo', year: 1958 },
        { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
        { title: 'Reservoir Dogs', year: 1992 },
        { title: 'Braveheart', year: 1995 },
        { title: 'M', year: 1931 },
        { title: 'Requiem for a Dream', year: 2000 },
        { title: 'Amélie', year: 2001 },
        { title: 'A Clockwork Orange', year: 1971 },
        { title: 'Like Stars on Earth', year: 2007 },
        { title: 'Taxi Driver', year: 1976 },
        { title: 'Lawrence of Arabia', year: 1962 },
        { title: 'Double Indemnity', year: 1944 },
        { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
        { title: 'Amadeus', year: 1984 },
        { title: 'To Kill a Mockingbird', year: 1962 },
        { title: 'Toy Story 3', year: 2010 },
        { title: 'Logan', year: 2017 },
        { title: 'Full Metal Jacket', year: 1987 },
        { title: 'Dangal', year: 2016 },
        { title: 'The Sting', year: 1973 },
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: "Singin' in the Rain", year: 1952 },
        { title: 'Toy Story', year: 1995 },
        { title: 'Bicycle Thieves', year: 1948 },
        { title: 'The Kid', year: 1921 },
        { title: 'Inglourious Basterds', year: 2009 },
        { title: 'Snatch', year: 2000 },
        { title: '3 Idiots', year: 2009 },
        { title: 'Monty Python and the Holy Grail', year: 1975 },
    ];

    const flatProps = {
        options: top100Films.map(option => option.title),
    };

    const [cities, setCities] = useState([]);

    //Is escorted
    const [isEscorted, setIsEscorted] = useState(false);
    const switchOnChangeHandle = () => {
        setIsEscorted(prevState => !prevState);
    };

    //Tabs
    const [tabValue, setTabValue] = useState(0);
    const tabsChangeHandler = (event, newValue) => {
        setTabValue(newValue);
    };
    //Address city
    const [addressCity, setAddressCity] = useState('');
    const addressCityChangeHandler = event => {
        setAddressCity(event.target.value);
    };
    //Address street
    const [addressStreet, setAddressStreet] = useState('');
    const addressStreetChangeHandler = event => {
        setAddressStreet(event.target.value);
    };

    //TODO add react hook form
    const handleSubmit = () => {
        console.log('submit');
    };

    return (
        <StyledPatientDetails>
            <StyledForm onSubmit={handleSubmit}>
                <Title fontSize={'28px'} color={'#002398'} label={'Patient Details'}/>
                <StyledFormGroup title={t('Accompanying patient')}>
                    <Title fontSize={'18px'} color={'#000b40'} label={'Accompanying patient'} bold/>
                    <StyledDivider variant={'fullWidth'}/>
                    <span>{t('Patient arrived with an escort?')}</span><Switch size={'medium'} color={'primary'}
                                                                               onChange={switchOnChangeHandle}
                                                                               value={isEscorted}/>
                </StyledFormGroup>
                {isEscorted ?
                    <StyledFormGroup>
                        <Title fontSize={'18px'} color={'#000b40'} label={t('Escort details')} bold/>
                        <StyledDivider variant={'fullWidth'}/>
                        <StyledTextField id={'escortName'} label={t('Escort name')}/>
                        <StyledTextField id={'escortMobilePhone'} label={t('Escort cell phone ')}/>
                    </StyledFormGroup>
                    :
                    null}
                <StyledFormGroup>
                    <Title fontSize={'18px'} color={'#000b40'} label={t('Contact Information')} bold/>
                    <StyledDivider variant={'fullWidth'}/>
                    <Tabs
                        value={tabValue}
                        onChange={tabsChangeHandler}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="standard"
                        aria-label="full width tabs example">
                        <Tab label={t('Address')}/>
                        <Tab label={t('PO box')}/>
                    </Tabs>
                    {tabValue === 0 ?
                        <React.Fragment>
                            {/*<Autocomplete*/}
                            {/*    disablePortal*/}
                            {/*    options={cities}*/}
                            {/*    id={'addressCity'}*/}
                            {/*    renderInput={params => <StyledTextField {...params} label={t('City')}*/}
                            {/*                                            value={addressCity} InputProps={{*/}
                            {/*        [languageDirection === 'rtl' ? 'endAdornment' : 'startAdornment']:*/}
                            {/*            <InputAdornment position={'end'}>{<ExpandMore/>}</InputAdornment>,*/}
                            {/*    }}*/}
                            {/*                                            onChange={addressCityChangeHandler}*/}
                            {/*    onClick={addressCityClickHandler}/>}*/}
                            {/*/>*/}
                            <Autocomplete
                            {...flatProps}
                            id="flat-demo"
                            disablePortal
                            label={'Hello'}
                            renderInput={params => <StyledTextField {...params} label="disableCloseOnSelect" margin="normal" InputProps={{
                                endAdornment: <InputAdornment position={'end'}><ExpandMore /></InputAdornment>
                            }}
                                                                    />}
                        />
                            <StyledTextField
                                label={t('Street')}
                                select
                                id="addressStreet"
                                value={addressStreet}
                                onChange={addressStreetChangeHandler}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </StyledTextField>
                            <StyledTextField id={'addressHouseNumber'} label={t('House number')}/>
                            <StyledTextField id={'addressPostalCode'} label={t('Postal code')}/>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <StyledTextField id={'POBoxCity'} label={t('City')}/>
                            <StyledTextField id={'POBox'} label={t('PO box')}/>
                            <StyledTextField id={'POBoxPostalCode'} label={t('Postal code')}/>
                        </React.Fragment>}
                </StyledFormGroup>
                <span>{t('To find a zip code on the Israel post site')} <a
                    href={'https://mypost.israelpost.co.il/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D/%D7%90%D7%99%D7%AA%D7%95%D7%A8-%D7%9E%D7%99%D7%A7%D7%95%D7%93/'}
                    target={'_blank'}>{t('click here')}</a></span>
            </StyledForm>
        </StyledPatientDetails>
    );
};
const mapStateToProps = state => {
    return {
        languageDirection: state.settings.lang_dir,
    };
};
export default connect(mapStateToProps, null)(PatientDetailsBlock);
