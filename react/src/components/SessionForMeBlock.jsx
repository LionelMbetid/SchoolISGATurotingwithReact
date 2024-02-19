
export default function SessionForMeBlock() {
  return (
      <div class="w-full drop-shadow-lg flex flex-col md:flex-row md:justify-between py-2 px-4 bg-white mb-4">
        <div class="leftSide">
          <div class="flex items-center h-full">
            <div class="flex flex-col self-center">
              <div
                class="w-14 h-14 rounded-full bg-[url('../../public/images/profil.jpg')] bg-cover bg-center bg-no-repeat">
              </div>
            </div>
            <div class="flex flex-col ml-4">
              <h3 class="text-l font-semibold dark:text-white">Revision de Java</h3>
              <h6 class="text-xs md:text-sm text-gray-600 font-semibold dark:text-white">Khalid Tourabi
              </h6>
              <h6 class="text-xs md:text-sm font-semibold mt-2 dark:text-white">Matiére : <span
                class="text-gray-600">Java</span></h6>
            </div>
          </div>
        </div>
        <div class="rightSide mt-6 md:mt-0">
          <div class="flex flex-col items-center md:items-end p-2">
            <div class="text-xs md:text-sm font-semibold text-gray-700">Date Programmé : <span
              class="text-Red text-xs">28/10/2023 10:12 PM</span></div>
            <div class="flex flex-row gap-x-1 mt-2">
              <img src="{{ asset('icons/icons8-pending-50.png') }}" alt="enAttente" class="h-4 w-4" />
              <h6 class="text-xs md:text-sm text-gray-800">en Attente</h6>
            </div>
            <a href="{{route('session.formedetails')}}"
              class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Détails
              <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
        </div>
      )
}
