export const CONFIG = {
  db:{
    SERVER_KEY: 'server_config'
  },
  api:{
    url: 'http://142.93.52.217',
    port: '5000',
    jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YzMyNjQ5NDBjMDMyNzBhNWVjZmU4MjMiLCJyb2wiOiIxIiwiaWF0IjoxNTQ2ODA3NDEzLCJleHAiOjE5ODg2NTcwMTN9.VpkGt9VEyG78b5umMEINdCFqvvffmjE-rHhjbmKnHiQ',
    path:{
      login: '/api/v1/auth/login',
      validateId: '/api/v1/auth/conductores/checkdocument',
    },
    drivers:{
      register: '/api/v1/auth/conductores/register-user'      
    }
  }  
}