import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axiosClient from '../axios-client';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



export default function LiveSearchStudentBar(props) {

  console.log(props);
  const idSubject = props.idSubject;
  const idUser = props.idUser;
  const sessionType = props.session;



  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 }];

  const [listUsers, setListUsers] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  const [userisAdded, setUserIsAdded] = useState(false);


  const fetchUsersNotMeAndNotSubject = (e, newValue) => {
    const payload = {
      idUser: idUser,
      idSubject: idSubject,
      text: newValue,
      listUsersAdded: props.usersAdded.map((e)=>{
        return e.id
      })
    }
    axiosClient.post("student/getAllUsersNotMeNotSubjectSelected", payload).then(({ data }) => {
      setListUsers(data.message)
    }).catch(err => {

    });
  }


  return (
    <>
    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ajouter Etudiants :</div>
    <div>
      {
        userisAdded && <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert onClose={() => { props.usersAddedFunc(false); }}>Tu peux pas ajouter le meme étudiant</Alert>
        </Stack >
      }

      <Stack spacing={3} >
        <Autocomplete
          className="w-full"
          multiple
          id="tags-outlined"
          options={listUsers}
          value={props.usersAdded}
          getOptionLabel={(option) => option.name}
          onInputChange={fetchUsersNotMeAndNotSubject}
          filterSelectedOptions
          clearIcon
          onChange={(event, newValue, option, element) => {
            if (option === "selectOption") {
              if(props.session === 'one'){
                if(props.usersAdded.length === 0){
                  props.usersAddedFunc(result => [element.option]);
                  setListUsers([]);
                }
              }else{


              let checkIsExist = props.usersAdded.some((item) => {
                console.log("checkIsExist");
                // console.log(item.id);
                // console.log(element.option.id);
                return item.id === element.option.id
              });
              if (!checkIsExist) {
                props.usersAddedFunc(result => [...result, element.option]);
                setListUsers([]);
                console.log(props.usersAdded + "list users added");
              } else {
                setUserIsAdded(true);

              }
            }
            } else if (option === "removeOption") {
              props.usersAddedFunc(props.usersAdded.filter(item => item.id !== element.option.id))
            }
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            );
          }}
          renderInput={(params) => {
            console.log(props.usersAdded);
            //console.log(params);
            return (
              <TextField
                {...params}
                label="Ajouter Etudiants"
                placeholder="Etudiants"
              />
            )
          }}
        />

      </Stack>


    </div>
    </>
  )
}
