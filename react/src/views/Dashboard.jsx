
import { Link, Outlet } from 'react-router-dom';
import LogoIsga from '../assets/images/isgaLogo.png';
import SessionsIcon from '../assets/icons/sessions.png';
import SubjectIcon from '../assets/icons/booksSubjects.png';
import TutorIcon from '../assets/icons/teacherTutors.png';
import AddSubjectIcon from '../assets/icons/iconAddSubject.png';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';
import { useState } from 'react';





export default function Dashboard() {
  const { user, setUser, setToken } = useStateContext();
  const [sessionListShow, setSessionListShow] = useState(true);
  const [profileListShow, setProfileListShow] = useState(false);
  const logout = () => {
    axiosClient.post('logout').then(({ data }) => {
      setToken(null);
      setUser({});
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('ROLE_USER');
    }).catch(err => {
      const response = err.response;
      if (response) {
        if (response.status === 422) {
          console.log("no data found");
          setErrors(response.data.errors);
        }
      }
    })
  }

  const toggleSessionList = () => {
    console.log(sessionListShow);
    setSessionListShow(!sessionListShow);
  }
  const toggleProfileListShow = () => {
    console.log(sessionListShow);
    setProfileListShow(!profileListShow);
  }

  return (
    <div className="w-full">

      <div className="header">
        <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>

      </div>
      <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="logoContainer mb-5">
            <img src={LogoIsga} alt="isgaLogo" className="block w-64 h-14 px-6" />
            <h1 className="text-xl font-bold text-center ">School <span className="text-Red">Tutoring</span></h1>
          </div>


          <ul className="space-y-2 font-medium">

            <li>
              <button type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" onClick={toggleSessionList}>
                <img src={SessionsIcon} alt="" className="w-8 h-8" />
                <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Sessions</span>
                <svg sidebar-toggle-item className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
              {sessionListShow && <ul id="dropdown-example" className="py-2 space-y-2">
                <li>
                  <Link to="/sessionsForMe" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Sessions for Me</Link>
                </li>
                <li>
                  <Link to="/publicSessions" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Public Sessions</Link>
                </li>
                <li>
                  <Link to="/mySessions" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">My Sessions</Link>
                </li>
                <li>
                  <Link to="/createSession" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Create Session</Link>
                </li>
              </ul>
              }
            </li>
            <li>
              <Link to="/subjects/list" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <img src={SubjectIcon} alt="" className="w-6 h-6 mx-1" />
                <span className="flex-1 ml-3 whitespace-nowrap">Subjects</span>
              </Link>
            </li>
            <li>
              <Link to="/tutors/list" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <img src={TutorIcon} alt="" className="w-8 h-8" />
                <span className="flex-1 ml-3 whitespace-nowrap">Tutors</span>
              </Link>
            </li>
            <li>
              <Link to="/addsubjects" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <img src={AddSubjectIcon} alt="" className="w-6 h-6" />
                <span className="flex-1 ml-3 whitespace-nowrap">Add Subject</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="px-4 sm:ml-64">
        <div className="w-full relative flex justify-end px-10 pb-4 pt-5">
          <div className="flex flex-col items-end">
            <div>

              <button type="button" onClick={toggleProfileListShow} className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <div
                  class="flex items-center w-12 h-12 justify-center rounded-full bg-cover bg-center bg-no-repeat bg-blue-600">
                  <div className="text-white font-bold text-lg">{user.name && user.name.charAt(0)}</div>
                </div>
              </button>
            </div>
            {
              profileListShow && <div className="z-50 absolute top-16 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 dark:text-white" role="none">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white" role="none">
                    {user.email}
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Profile</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                  </li>
                  <li>
                    <a href="#" onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Se déconnecter</a>
                  </li>
                </ul>
              </div>
            }
          </div>
        </div>
        <Outlet />
      </div>

    </div>
  )
}
