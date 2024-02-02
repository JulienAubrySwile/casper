class AuthController < ActionController::API

  # POST /auth
  def auth

    auth_data = Auth::Authentification.new(params[:login], 1)

    "OK"

  end

  # POST /secret
  def secret

  end

  # POST /refresh
  def refresh

  end

end
