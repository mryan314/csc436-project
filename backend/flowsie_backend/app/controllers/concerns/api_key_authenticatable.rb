module ApiKeyAuthenticatable
  extend ActiveSupport::Concern

  include ActionController::HttpAuthentication::Basic::ControllerMethods
  include ActionController::HttpAuthentication::Token::ControllerMethods

  attr_reader :current_api_key
  attr :current_bearer

  # Use this to raise error and auto respond with 401 http status code when API key auth fails
  def authenticate_with_api_key!
    @current_bearer = authenticate_or_request_with_http_token &method(:authenticator)
  end

  # Use this for optional API key auth
  def authenticate_with_api_key
    @current_bearer = authenticate_with_http_token &method(:authenticator)
  end

  private

  attr_writer :current_api_key
  attr_writer :current_bearer

  def authenticator(http_token, options)
    @current_api_key = ApiKey.authenticate_by_token http_token

    current_api_key&.bearer
  end
end