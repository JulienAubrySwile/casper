# frozen_string_literal: true

class Auth::Authentification

  def initialize(login, id)
    @id = id
    @login = login
    @expiration = DateTime.now + 1800.seconds
  end

end
