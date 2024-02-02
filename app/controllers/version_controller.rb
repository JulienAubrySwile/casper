class VersionController < ActionController::API

  # POST /auth
  def version
    render :json => JsonResponse.new(Context::Version.new)
  end

end
