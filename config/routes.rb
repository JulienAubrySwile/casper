Rails.application.routes.draw do

  post '/Casper/v1/auth', to: 'auth#auth'
  post '/Casper/v1/secret', to: 'auth#secret'
  post '/Casper/v1/auth/refresh', to: 'auth#refresh'


  get '/Casper/v1/context/version', to: 'version#version'

end
