import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LiveSearchStudentBar from "../../components/LiveSearchStudentBar";





export default function CreateSession() {

  const { user } = useStateContext();
  const [subjectUserList, setSubjectUserList] = useState([]);
  const [listUsersAdded, setListUsersAdded] = useState([]);
  const [title, setTitle] = useState("");
  const [todayDate, setTodayDate] = useState(dayjs());
  const [timeDate, setTimeDate] = useState(dayjs().add(1, 'hour').add(5, 'minute'));
  const [location, setLocation] = useState("distance");
  const [emp, setEmp] = useState("");
  const [nbStudents, setNbStudents] = useState(2);
  const [page, setPage] = useState(1);
  const [subjectId, setSubjectId] = useState();
  const [description,setDescription] = useState("");
  const [sessionType, setSessionType] = useState("one");
  const [messageSessionCreated,setMessageSessionCreated] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    todayDate: "",
    timeDate: "",
    location: "",
    emp: "",
    listUsersAdded: "",
    subjectId: "",
    sessionType: ""
  });
  const [errorValidation, setErrorValidation] = useState({ status: false, messag: "" });
  const [isLoading, setIsLoading] = useState(true);
  //const [isAuthorized, setIsAuthorized] = useState(null);

  const handleUsersAdded = (newState) => {
    setListUsersAdded(newState);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(
      {
        title: "",
        description: "",
        todayDate: "",
        timeDate: "",
        location: "",
        emp: "",
        listUsersAdded: "",
        subjectId: "",
        sessionType: ""
      }
    );
    if (title === "" || description === "" || emp === "" || subjectId === "" || sessionType === "") {
      setErrorValidation({
        status: true,
        message: "vous devez remplir tous les champs"
      });
    } else if (sessionType === "one" && listUsersAdded.length < 1) {
      setErrorValidation({
        status: true,
        message: "vous devez disposer au minimum d'un seul participant"
      });
    }else if (sessionType === "multiple" && (nbStudents < listUsersAdded.length || listUsersAdded.length < 2)) {
      setErrorValidation({
        status: true,
        message: "le nombre des étudiants doit etre au minimum 2. Vérifier le numéro max des étudiants"
      });
    }else{
       const payload =
       {
        title: title,
        description:description,
        dateBegin:todayDate.format("YYYY-MM-DD"),
        timeBegin:timeDate.format("HH:mm"),
        status:"notYet",
        sessionType: sessionType,
        place:emp,
        nbrStudents:nbStudents,
        student_id:user.id,
        subject_id:subjectId,
        studentsList:listUsersAdded.map((e)=>e.id)
       }
      axiosClient.post("session/createSession",payload).then(({data})=>{
        setMessageSessionCreated(true);
        setTitle("");
        setDescription("");
        setEmp("");
        setListUsersAdded([]);
        setLocation("");
        setNbStudents(2);
        setSessionType("one");
        setSubjectId(subjectUserList[0].id);
      }).catch(err=>{
          const response = err.response;
          if(response && response.status === 404){
            setErrorValidation({
              status : true,
              message: response.message
            })
          }
      });
      console.log();
      console.log();
      console.log(location);
      console.log(emp);
      console.log(listUsersAdded);
      console.log(subjectId);
      console.log(sessionType);
    }
  }




    //axiosClient.post()
    // setErrors(null);
    //console.log(e);


  const fetchUserListNotMeNotTeachSubject = (keyword) => {



  }

  const nextPage = () => {
    if (page === 1) {
      setPage(page + 1);
    }
  }
  const prevPage = () => {
    if (page === 2) {
      setPage(page - 1);
    }
  }




  const fetchSubjectsTutor = () => {
    setIsLoading(true);
    axiosClient.get(`tutor/getSubjectsOfTutor/${user.id}`).then(({ data }) => {
      setIsLoading(false);
      setSubjectUserList(data.subjects);
      setSubjectId(data.subjects[0].id);
      console.log(data.subjects + "subjects");
    }).catch(err => {
      setIsLoading(false);
      const response = err.response;
      if (response) {
        if (response.status === 422) {
          console.log("no data found");
          setErrors(response.data.errors);
        }
      }
    })

  }


  useEffect(() => {

    fetchSubjectsTutor()
  }, [user]);


  return (
    <>
      { messageSessionCreated && <Stack sx={{ width: '100%' }} spacing={2} >
        <Alert severity="success" onClose={() => { setMessageSessionCreated(false)}}>Session a été crée avec succés</Alert>
      </Stack>}
      {errorValidation.status && <Stack sx={{ width: '100%' }} spacing={2} onClick={() => { setErrorValidation(false) }}>
        <Alert severity="error" onClose={() => { }}>{errorValidation.message}</Alert>
      </Stack>}
      {isLoading ? <div className="flex mt-16 w-full items-center justify-center">
        <CircularProgress /></div> : subjectUserList.length > 0 ? (
          page === 1 ? (<div class="p-4">
            <h1 class="text-2xl font-bold mb-4 text-black dark:text-white">Create Session</h1>
            <h3 class="text-l font-bold mb-4 text-gray-600 dark:text-white">Informations :</h3>
            <form >
              <div class="mb-6">
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
                <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                {
                  errors['title'] !== "" && <p class="mt-2 text-xs text-red-600 dark:text-red-400"> {errors['title']}</p>
                }
              </div>
              <div class="mb-6">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" id="description" cols="30" rows="5" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">

                </textarea>
                {
                  errors['title'] !== "" && <p class="mt-2 text-xs text-red-600 dark:text-red-400"> {errors['title']}</p>
                }
              </div>

              <div
                class="mb-4 flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center md:gap-x-4 md:gap-y-0">

                <div class="relative w-full md:w-1/2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker className="w-full"
                        minDate={dayjs()}
                        label="Date"
                        value={todayDate ?? dayjs()}
                        onChange={(newValue) => {
                          setTodayDate(newValue)
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {
                    errors['todayDate'] !== "" && <p class="mt-2 text-xs text-red-600 dark:text-red-400"> {errors['todayDate']}</p>
                  }
                </div>
                <div class="relative w-full md:w-1/2">

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                      <TimePicker
                        minTime={dayjs().add(1, 'hour')}
                        className="w-full"
                        label="Heure"
                        value={timeDate ?? dayjs()}
                        onChange={(newValue) => setTimeDate(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {
                    errors['timeDate'] !== "" && <p class="mt-2 text-xs text-red-600 dark:text-red-400"> {errors['timeDate']}</p>
                  }
                </div>
              </div>
              <div class="mb-6">

                <label for="subject"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject:</label>
                <select id="subject" onChange={(e) => setSubjectId(e.target.value)} value={subjectId} name="subjectid"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                  {
                    subjectUserList.map((item) => {
                      return (
                        <option value={item.id}>{item.title}</option>
                      )
                    })
                  }



                </select>
                {
                  errors['subjectId'] !== "" && <p class="mt-2 text-xs text-red-600 dark:text-red-400"> {errors['subjectId']}</p>
                }
              </div>
              <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Session Type</label>
                <select onChange={(e) => {
                  setListUsersAdded([]);
                  setSessionType(e.target.value)
                }} value={sessionType} name="sessionType" id="subject"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                  <option value="one">Individuelle</option>
                  <option value="multiple">en Groupe</option>
                </select>
                {
                  errors['sessionType'] !== "" && <p class="mt-2 text-xs text-red-600 dark:text-red-400"> {errors['sessionType']}</p>
                }
              </div>

              <div class="flex justify-end">
                <button onClick={nextPage}
                  class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  Next</button>

              </div>
            </form>

          </div>) :

            (<div className="p-4">
              <h1 class="text-2xl font-bold mb-4 text-black dark:text-white">Create Session</h1>
              <h3 class="text-l font-bold mb-4 text-gray-600 dark:text-white">Ajouter Etudiants :</h3>
              {<form >
                {
                  sessionType === "one" ?
                    <div class="individuelle">
                      <LiveSearchStudentBar idUser={user.id} idSubject={subjectId} session={"one"} usersAddedFunc={handleUsersAdded} usersAdded={listUsersAdded} />

                      {/* <div class="mb-6 flex flex-col gap-y-4 md:flex-row md:justify-between md:gap-x-16 md:gap-y-0">
                            <div class="flex flex-col w-full md:w-1/2">
                                <h1 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">select student:</h1>
                                <div class="flex flex-col items-center">
                                    <label for="simple-search" class="sr-only">Search</label>
                                    <div class="relative w-full">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <input x-model="search" type="text" id="simple-search"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Search"/>
                                    </div>

                                    <ul
                                        class="w-full mt-4 overflow-auto h-[300px] divide-y divide-gray-200 dark:divide-gray-700">
                                            <li class="py-3 hover:bg-gray-200 cursor-pointer"
                                            >
                                                <div class="flex items-center space-x-4">
                                                    <div class="flex-shrink-0">
                                                        <img class="w-8 h-8 rounded-full"
                                                            src="/docs/images/people/profile-picture-1.jpg"
                                                            alt="Neil image"/>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <p x-text="studentItem.name"
                                                            class="text-sm font-medium text-gray-900 truncate dark:text-white">

                                                        </p>
                                                        <p x-text="studentItem.email"
                                                            class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        </p>
                                                    </div>

                                                </div>
                                            </li>




                                    </ul>
                                </div>

                            </div>
                            <div class="flex flex-col w-full md:w-1/2">
                                <h1 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Ajouté:
                                </h1>
                                <ul class="overflow-auto h-[300px] divide-y divide-gray-200 dark:divide-gray-700">
                                        <li class="py-3">
                                            <div class="flex items-center justify-between space-x-4">
                                                <div class="flex flex-row gap-x-2">
                                                    <div class="flex-shrink-0">
                                                        <img class="w-8 h-8 rounded-full"
                                                            src="/docs/images/people/profile-picture-1.jpg"
                                                            alt="Neil image"/>
                                                    </div>
                                                    <div>
                                                        <p x-text="itemStudent.name"
                                                            class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        </p>
                                                        <p x-text="itemStudent.email"
                                                            class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        </p>
                                                    </div>
                                                </div>
                                                <button type="button" x-on:click="deleteStudent(itemStudent)"
                                                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                        width="24" height="24" viewBox="0,0,256,256"
                                                        style={{ fill: '#000000' }}>
                                                        <g fill="#ffffff" fill-rule="nonzero" stroke="none"
                                                            stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
                                                            stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                                                            font-family="none" font-weight="none" font-size="none"
                                                            text-anchor="none" style={{ mixBlendMode: 'normal' }}>
                                                            <g transform="scale(10.66667,10.66667)">
                                                                <path
                                                                    d="M10,2l-1,1h-5v2h3h10h3v-2h-5l-1,-1zM5,7v13c0,1.1 0.9,2 2,2h10c1.1,0 2,-0.9 2,-2v-13z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </svg> <span class="px-1"></span>
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                </ul>
                            </div> </div> */}
                    </div> : <div class="group">
                      <div class="mb-6">
                        <label for="nbStudents" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de participants maximale</label>
                        <TextField
                          id="outlined-number"
                          label="Number"
                          type="number"
                          onChange={(e) => {
                            setNbStudents(e.target.value)
                          }}
                          value={nbStudents}
                          inputProps={{ min: 2, max: 30 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        {
                          errors['nbStudent'] !== "" && <p class="mt-2 text-xs text-red-600 dark:text-red-400"> {errors['nbStudent']}</p>
                        }
                      </div>
                      <LiveSearchStudentBar idUser={user.id} idSubject={subjectId} session={"multiple"} usersAddedFunc={handleUsersAdded} usersAdded={listUsersAdded} />
                      {/* <div class="mb-6">
                        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre
                            Maximale de participants :</label>
                        <input type="title" id="title" x-model="maxNumber"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                    </div>
                    <div class="mb-6 flex flex-col gap-y-4 md:flex-row md:justify-between md:gap-x-16 md:gap-y-0">
                        <div class="flex flex-col w-full md:w-1/2">
                            <h1 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">select student(s):
                            </h1>
                            <form class="flex items-center">
                                <label for="simple-search" class="sr-only">Search</label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <input type="text" id="simple-search"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Search"/>
                                </div>

                                <ul class="mt-4 overflow-auto h-[300px] divide-y divide-gray-200 dark:divide-gray-700">
                                        <li class="py-3 hover:bg-gray-200 cursor-pointer"
                                            x-on:click="addStudent(studentItem)">
                                            <div class="flex items-center space-x-4">
                                                <div class="flex-shrink-0">
                                                    <img class="w-8 h-8 rounded-full"
                                                        src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/>
                                                </div>
                                                <div class="flex-1 min-w-0">
                                                    <p x-text="studentItem.name"
                                                        class="text-sm font-medium text-gray-900 truncate dark:text-white">

                                                    </p>
                                                    <p x-text="studentItem.email"
                                                        class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    </p>
                                                </div>

                                            </div>
                                        </li>




                                </ul>
                            </form>

                        </div>
                        <div class="flex flex-col w-full md:w-1/2">
                            <h1 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Students Ajouté:</h1>
                            <ul class="overflow-auto h-[300px] divide-y divide-gray-200 dark:divide-gray-700">
                                    <li class="py-3">
                                        <div class="flex items-center justify-between space-x-4">
                                            <div class="flex flex-row gap-x-2">
                                                <div class="flex-shrink-0">
                                                    <img class="w-8 h-8 rounded-full"
                                                        src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/>
                                                </div>
                                                <div>
                                                    <p x-text="itemStudent.name"
                                                        class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    </p>
                                                    <p x-text="itemStudent.email"
                                                        class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    </p>
                                                </div>
                                            </div>
                                            <button type="button" x-on:click="deleteStudent(itemStudent)"
                                                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                    width="24" height="24" viewBox="0,0,256,256"
                                                    style={{ fill: '#000000' }}>
                                                    <g fill="#ffffff" fill-rule="nonzero" stroke="none"
                                                        stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
                                                        stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                                                        font-family="none" font-weight="none" font-size="none"
                                                        text-anchor="none" style={{ mixBlendMode: 'normal' }}>
                                                        <g transform="scale(10.66667,10.66667)">
                                                            <path
                                                                d="M10,2l-1,1h-5v2h3h10h3v-2h-5l-1,-1zM5,7v13c0,1.1 0.9,2 2,2h10c1.1,0 2,-0.9 2,-2v-13z">
                                                            </path>
                                                        </g>
                                                    </g>
                                                </svg> <span class="px-1"></span>
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                            </ul>
                        </div>
                        </div> */}
                    </div>


                }
                <div class="mb-6 mt-6 flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center md:gap-x-4 md:gap-y-0"
                >
                  <div class="w-full md:w-1/2">
                    <label for="lieu" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Location :</label>
                    <select onChange={(e) => setLocation(e.target.value)} value={location} name="lieu" id="lieu"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="distance">à distance</option>
                      <option value="presentielle">présentielle</option>
                    </select>

                  </div>

                  <div class="w-full md:w-1/2">
                    <label for="emp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Emplacement :</label>
                    <input onChange={(e) => setEmp(e.target.value)} value={emp} type="text" name="emp" id="emp" x-model="formData.emp"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                  </div>
                </div>




              </form>}
              <div class="flex space-x-3 justify-end">

                <button onClick={prevPage}
                  class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  Precedent</button>
                <button type="submit" onClick={onSubmit}
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Submit</button>
              </div>
            </div>))
        :
        (<div className="flex flex-col space-y-5 mt-32 w-full items-center justify-center">
          <p>Vous devez ajouter des subjects à enseigner pour créer la session</p>
          <Link to="/addsubjects" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter Matière</Link>

        </div>)
      }
    </>
  )
    }




