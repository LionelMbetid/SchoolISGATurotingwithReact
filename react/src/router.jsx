import { Navigate, createBrowserRouter } from "react-router-dom"
import Login from "./views/Auth/Login.jsx"
import SignUp from "./views/Auth/Signup.jsx"
import NotFound from "./views/Notfound.jsx"
import GuestLayout from "./components/GuestLayout.jsx"
import Dashboard from "./views/Dashboard.jsx"
import DefaultLayout from "./components/DefaultLayout.jsx"
import DashboardAdmin  from "./views/Admin/Dashboard.jsx"
import DefaultAdmin from "./components/Admin/DefaultLayout.jsx"
import GuestAdmin  from "./components/Admin/GuestLayout.jsx"
import LoginAdmin from "./views/Admin/Auth/Login.jsx"
import CreateSession from "./views/Session/createSession.jsx"
import SessionForMe from "./views/Session/sessionForMe.jsx"
import ListStudentControl from "./views/Admin/student/list.jsx"
import ListSubject from "./views/Admin/Subject/list.jsx"
import CreateSubject from "./views/Admin/Subject/create.jsx"
import AddTutorSubject from "./views/Session/addTutorSubject.jsx"
import ListTutors from "./views/Tutor/list.jsx"
import ListStudentSubjects from "./views/Subject/list.jsx"
import ListTutorsBySubject from "./views/Tutor/listSubject.jsx"
import PublicSessions from "./views/Session/publicSessions.jsx"
import MySessions from "./views/Session/mySessions.jsx"
import SessionForMeDetails from "./views/Session/sessionForMeDetails.jsx"

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
          children: [
            {
              path: '/sessionsForMe',
              element: <SessionForMe />
            },
            {
              path: '/createSession',
              element: <CreateSession/>
            },
            {
              path: '/addsubjects',
              element: <AddTutorSubject/>
            },
            {
              path: '/tutors/list',
              element: <ListTutors/>
            },
            {
              path: '/subjects/list',
              element: <ListStudentSubjects/>
            },{
              path: '/tutors/list/subject',
              element: <ListTutorsBySubject/>
            },
            {
              path: '/publicSessions',
              element : <PublicSessions/>
            },
            {
              path: '/mySessions',
              element: <MySessions />
            },
            {
              path: '/sessionsforme/details',
              element: <SessionForMeDetails/>
            }
          ]
        },
        {
          path: '/dashboard',
          element: <Dashboard />,

        }
      ]
    },
    {
      path: '/',
      element: <GuestLayout />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/signup',
          element: <SignUp />
        }
      ]
    },
    {
      path: '/admin',
      element: <DefaultAdmin />,
      children: [
        {
          path: '/admin',
          element: <DashboardAdmin />,
          children : [
            {
              path: '/admin/student/list',
              element: <ListStudentControl />,
            },
            {
              path: '/admin/subject/create',
              element: <CreateSubject />,
            },
            {
              path: '/admin/subject/modify',
              element: <ListStudentControl />,
            },
            {
              path: '/admin/subject/list',
              element: <ListSubject />,
            },
            {
              path: '/admin/class/create',
              element: <ListStudentControl />,
            },
            {
              path: '/admin/class/list',
              element: <ListStudentControl />,
            },
          ]
        },
      ]
    },
    {
      path: '/admin',
      element: <GuestAdmin />,
      children: [
        {
          path: '/admin/login',
          element: <LoginAdmin />,
        },

      ]
    }

    ,
    {
      path: '*',
      element: <NotFound />
    }
  ])
export default router;
