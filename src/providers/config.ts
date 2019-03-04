export const CONFIG = {
  localdb:{
    USER_KEY: 'user_key',
    USER_DATA_KEY: 'user_data_key',
    USER_FIRETOKEN: 'user_firetoken_key'
  },
  support:{
    whatsapp: '+573103999999',
    phone: '+573103999999'
  },
  api:{
    url: 'http://142.93.52.217',
    urldev: 'http://localhost',
    port: '5000',
    jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YzMyNjQ5NDBjMDMyNzBhNWVjZmU4MjMiLCJyb2wiOiIxIiwiaWF0IjoxNTQ2ODA3NDEzLCJleHAiOjE5ODg2NTcwMTN9.VpkGt9VEyG78b5umMEINdCFqvvffmjE-rHhjbmKnHiQ',
    path:{
      login: '/api/v1/auth/login',
      register: '/api/v1/auth/register',
      verify: '/api/v1/auth/verify',
      me: '/api/v1/auth/me'
    },
    drivers:{
      login: '/api/v1/auth/conductores/login',
      register: '/api/v1/auth/conductores/register-user',
      validateId: '/api/v1/auth/conductores/checkdocument',
      setInServices: '/api/v1/auth/conductores/set-in-service',
      getDrivers: '/api/v1/auth/conductores/get-driver',
      updateDriver: '/api/v1/auth/conductores/update-datos',
    },
    cart:{
      getClass: '/api/v1/auth/vehicles/get-vehicle-class',
      add: '/api/v1/auth/conductores/add-vehicle',
      getVehicles: '/api/v1/auth/conductores/get-vehicles',
      getMyVehicle: '/api/v1/auth/conductores/get-my-vehicle',
      updateVehicle: '/api/v1/auth/conductores/update-my-vehicle',
      getMySelect: '/api/v1/auth/conductores/get-my-vehicle-select'
    },
    offer:{
      get: '/api/v1/offers/get-offers',
      getById: '/api/v1/offers/get-offer-detail',
      new: '/api/v1/offers/new-offer',
      myOffers: '/api/v1/offers/get-my-offers',
      postulate: '/api/v1/offers/postulate',
      updateOfferState: '/api/v1/offers/set-step-offer',
      updateOffer: '/api/v1/offers/update-offer-state',
      getDriverMyOffers: '/api/v1/offers/get-my-offers-conductor'
    },
    push:{
      postPush: '/api/v1/auth/push'
    }
  },
  dev:{
    getOffers: '/api/v1/offers/get-offers',
    newOffers: '/api/v1/offers/new-offer',
    login: '/api/v1/auth/conductores/login',
    register: '/api/v1/auth/conductores/register-user',
    validateId: '/api/v1/auth/conductores/checkdocument',
    setInServices: '/api/v1/auth/conductores/set-in-service',
    getDrivers: '/api/v1/auth/conductores/get-driver',
    updateConductor: '/api/v1/auth/conductores/update-datosB'
  }
}
