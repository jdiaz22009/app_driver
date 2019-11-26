const env = 'dev'
// const env = 'prod'

const prod = {
  environment: "prod",
  localdb: {
    USER_KEY: "user_key",
    USER_DATA_KEY: "user_data_key",
    USER_FIRETOKEN: "user_firetoken_key"
  },
  support: {
    whatsapp: "+573205801985",
    phone: "+573205801985",
    email: "info@cargaya.com",
    urlpagaya: "https://mipagaya.com/auth/login"
  },
  api: {
    url: "https://prodcargaya.com",
    url_sockets: "https://prodcargaya.com",
    drivers: {
      login: "/api/v1/auth/conductores/login",
      verifyToken: "/api/v1/auth/verify",
      register: "/api/v1/auth/conductores/register-user",
      validateId: "/api/v1/auth/conductores/checkdocument",
      setInServices: "/api/v1/auth/conductores/set-in-service",
      getDrivers: "/api/v1/auth/conductores/get-driver",
      updateDriver: "/api/v1/auth/conductores/update-datos",
      wayTopay: "/api/v1/auth/conductores/forma-pago",
      create_reference: "/api/v1/auth/conductores/referencias",
      saveUrl: "/api/v1/auth/conductores/save-url",
      comingSoon: "/api/v1/auth/conductores/comingsoon",
      offerCount: "/api/v1/offers/libres"
    },
    cart: {
      getClass: "/api/v1/auth/vehicles/get-vehicle-class",
      add: "/api/v1/auth/conductores/add-vehicle",
      getVehicles: "/api/v1/auth/conductores/get-vehicles",
      getMyVehicle: "/api/v1/auth/conductores/get-my-vehicle",
      updateVehicle: "/api/v1/auth/conductores/update-my-vehicle",
      getMySelect: "/api/v1/auth/conductores/get-my-vehicle-select",
      deleteVehicle: "/api/v1/auth/vehicles/delete"
    },
    offer: {
      get: "/api/v1/offers/get-offers-mobile",
      getById: "/api/v1/offers/get-offer-detail",
      new: "/api/v1/offers/new-offer",
      myOffers: "/api/v1/offers/get-my-offers",
      postulate: "/api/v1/offers/postulate",
      updateOfferState: "/api/v1/offers/set-step-offer",
      updateOffer: "/api/v1/offers/update-offer-state",
      getDriverMyOffers: "/api/v1/offers/get-my-offers-conductor",
      acceptOffer: "/api/v1/offers/seleccionar",
      ordenCargue: "/api/v1/offers/is-ordencargue",
      getfilters: "/api/v1/offers/search",
      offerLoad: "/api/v1/offers/uploadphotoscargue",
      canceltOffer: "/api/v1/offers/cancelarOffers",
      offerCumplido: "/api/v1/offers/uploadcumplido",
      qualifyCompany: "/api/v1/auth/calificar/entidad",
      offerTracking: "/api/v1/offers/ofertatracking",
      rejectOffer: "/api/v1/offers/cancelarAsignacion"
    },
    push: {
      postPush: "/api/v1/auth/push"
    }
  }
};

const dev = {
  environment: "dev",
  localdb: {
    USER_KEY: "user_key",
    USER_DATA_KEY: "user_data_key",
    USER_FIRETOKEN: "user_firetoken_key"
  },
  support: {
    whatsapp: "+573205801985",
    phone: "+573205801985",
    email: "info@cargaya.com",
    urlpagaya: "https://mipagaya.com/auth/login"
  },
  api: {
    url: "https://devcargaya.com",
    url_sockets: "https://devcargaya.com",
    drivers: {
      login: "/api/v1/auth/conductores/login",
      verifyToken: "/api/v1/auth/verify",
      register: "/api/v1/auth/conductores/register-user",
      validateId: "/api/v1/auth/conductores/checkdocument",
      setInServices: "/api/v1/auth/conductores/set-in-service",
      getDrivers: "/api/v1/auth/conductores/get-driver",
      updateDriver: "/api/v1/auth/conductores/update-datos",
      wayTopay: "/api/v1/auth/conductores/forma-pago",
      create_reference: "/api/v1/auth/conductores/referencias",
      saveUrl: "/api/v1/auth/conductores/save-url",
      comingSoon: "/api/v1/auth/conductores/comingsoon",
      offerCount: "/api/v1/offers/libres"
    },
    cart: {
      getClass: "/api/v1/auth/vehicles/get-vehicle-class",
      add: "/api/v1/auth/conductores/add-vehicle",
      getVehicles: "/api/v1/auth/conductores/get-vehicles",
      getMyVehicle: "/api/v1/auth/conductores/get-my-vehicle",
      updateVehicle: "/api/v1/auth/conductores/update-my-vehicle",
      getMySelect: "/api/v1/auth/conductores/get-my-vehicle-select",
      deleteVehicle: "/api/v1/auth/vehicles/delete"
    },
    offer: {
      get: "/api/v1/offers/get-offers-mobile",
      getById: "/api/v1/offers/get-offer-detail",
      new: "/api/v1/offers/new-offer",
      myOffers: "/api/v1/offers/get-my-offers",
      postulate: "/api/v1/offers/postulate",
      updateOfferState: "/api/v1/offers/set-step-offer",
      updateOffer: "/api/v1/offers/update-offer-state",
      getDriverMyOffers: "/api/v1/offers/get-my-offers-conductor",
      acceptOffer: "/api/v1/offers/seleccionar",
      ordenCargue: "/api/v1/offers/is-ordencargue",
      getfilters: "/api/v1/offers/search",
      offerLoad: "/api/v1/offers/uploadphotoscargue",
      canceltOffer: "/api/v1/offers/cancelarOffers",
      offerCumplido: "/api/v1/offers/uploadcumplido",
      qualifyCompany: "/api/v1/auth/calificar/entidad",
      offerTracking: "/api/v1/offers/ofertatracking",
      rejectOffer: "/api/v1/offers/cancelarAsignacion"
    },
    push: {
      postPush: "/api/v1/auth/push"
    }
  }
};

const config = {
  prod,
  dev
};

export const CONFIG = config[env];
