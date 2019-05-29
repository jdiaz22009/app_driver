const env = 'dev'
// const env = 'prod'

const prod = {
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
    url: 'https://cargaya.live',
    url_sockets: '',
    drivers:{
      login: '/api/v1/auth/conductores/login',
      verifyToken: '/api/v1/auth/verify',
      register: '/api/v1/auth/conductores/register-user',
      validateId: '/api/v1/auth/conductores/checkdocument',
      setInServices: '/api/v1/auth/conductores/set-in-service',
      getDrivers: '/api/v1/auth/conductores/get-driver',
      updateDriver: '/api/v1/auth/conductores/update-datos',
      wayTopay: '/api/v1/auth/conductores/forma-pago',
      create_reference:'/api/v1/auth/conductores/referencias',
      saveUrl:'/api/v1/auth/conductores/save-url',
      comingSoon:'/api/v1/auth/conductores/comingsoon',
      offerCount: '/api/v1/offers/libres'
    },
    cart:{
      getClass: '/api/v1/auth/vehicles/get-vehicle-class',
      add: '/api/v1/auth/conductores/add-vehicle',
      getVehicles: '/api/v1/auth/conductores/get-vehicles',
      getMyVehicle: '/api/v1/auth/conductores/get-my-vehicle',
      updateVehicle: '/api/v1/auth/conductores/update-my-vehicle',
      getMySelect: '/api/v1/auth/conductores/get-my-vehicle-select',
      deleteVehicle: '/api/v1/auth/vehicles/delete'
    },
    offer:{
      get: '/api/v1/offers/get-offers',
      getById: '/api/v1/offers/get-offer-detail',
      new: '/api/v1/offers/new-offer',
      myOffers: '/api/v1/offers/get-my-offers',
      postulate: '/api/v1/offers/postulate',
      updateOfferState: '/api/v1/offers/set-step-offer',
      updateOffer: '/api/v1/offers/update-offer-state',
      getDriverMyOffers: '/api/v1/offers/get-my-offers-conductor',
      acceptOffer: '/api/v1/offers/seleccionar',
      ordenCargue: '/api/v1/offers/is-ordencargue'
    },
    push:{
      postPush: '/api/v1/auth/push'
    }
  }
}

const dev = {
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
    url: 'https://api.cargaya.net',
    url_sockets: 'https://api.cargaya.net',
    drivers:{
      login: '/api/v1/auth/conductores/login',
      verifyToken: '/api/v1/auth/verify',
      register: '/api/v1/auth/conductores/register-user',
      validateId: '/api/v1/auth/conductores/checkdocument',
      setInServices: '/api/v1/auth/conductores/set-in-service',
      getDrivers: '/api/v1/auth/conductores/get-driver',
      updateDriver: '/api/v1/auth/conductores/update-datos',
      wayTopay: '/api/v1/auth/conductores/forma-pago',
      create_reference:'/api/v1/auth/conductores/referencias',
      saveUrl:'/api/v1/auth/conductores/save-url',
      comingSoon:'/api/v1/auth/conductores/comingsoon',
      offerCount: '/api/v1/offers/libres'
    },
    cart:{
      getClass: '/api/v1/auth/vehicles/get-vehicle-class',
      add: '/api/v1/auth/conductores/add-vehicle',
      getVehicles: '/api/v1/auth/conductores/get-vehicles',
      getMyVehicle: '/api/v1/auth/conductores/get-my-vehicle',
      updateVehicle: '/api/v1/auth/conductores/update-my-vehicle',
      getMySelect: '/api/v1/auth/conductores/get-my-vehicle-select',
      deleteVehicle: '/api/v1/auth/vehicles/delete'
    },
    offer:{
      get: '/api/v1/offers/get-offers-mobile',
      getById: '/api/v1/offers/get-offer-detail',
      new: '/api/v1/offers/new-offer',
      myOffers: '/api/v1/offers/get-my-offers',
      postulate: '/api/v1/offers/postulate',
      updateOfferState: '/api/v1/offers/set-step-offer',
      updateOffer: '/api/v1/offers/update-offer-state',
      getDriverMyOffers: '/api/v1/offers/get-my-offers-conductor',
      acceptOffer: '/api/v1/offers/seleccionar',
      ordenCargue: '/api/v1/offers/is-ordencargue',
      getfilters: '/api/v1/offers/search',
      offerLoad: '/api/v1/offers/uploadphotoscargue',
      canceltOffer: '/api/v1/offers/cancelarOffers',
      offerCumplido: '/v1/offers/uploadcumplido'
    },
    push:{
      postPush: '/api/v1/auth/push'
    }
  }
}

const config = {
  prod,
  dev
}

export const CONFIG = config[env]


