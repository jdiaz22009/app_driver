export const CONFIG = {
  localdb:{
    USER_KEY: 'user_key',    
  },
  api:{
    url: 'http://142.93.52.217',
    port: '5000',
    jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YzMyNjQ5NDBjMDMyNzBhNWVjZmU4MjMiLCJyb2wiOiIxIiwiaWF0IjoxNTQ2ODA3NDEzLCJleHAiOjE5ODg2NTcwMTN9.VpkGt9VEyG78b5umMEINdCFqvvffmjE-rHhjbmKnHiQ',
    path:{
      login: '/api/v1/auth/login',      
      register: '/api/v1/auth/register',
      me: '/api/v1/auth/me'
    },
    drivers:{
      login: '/api/v1/auth/conductores/login',
      register: '/api/v1/auth/conductores/register-user',      
      validateId: '/api/v1/auth/conductores/checkdocument',
    },
    cart:{
      getClass: '/api/v1/auth/vehicles/get-vehicle-class',
      add: '/api/v1/auth/conductores/add-vehicle'
    },
    offer:{
      get: '/api/v1/offers/get-offers',
      new: '/api/v1/offers/new-offer'
    }

  }  
}