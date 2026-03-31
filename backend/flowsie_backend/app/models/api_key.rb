class ApiKey < ApplicationRecord
  HMAC_SECRET_KEY = ENV.fetch('API_KEY_HMAC_SECRET_KEY')

  belongs_to :bearer, polymorphic: true

  before_create :generate_token_hmac_digest

  # Virtual attribute for raw token value, allowing us to respond with the 
  # API key's non-hashed token value. But only directly after creation.
  attr_accessor :token

  def self.authenticate_by_token!(token)
    digest = OpenSSL::HMAC.hexdigest 'SHA256', HMAC_SECRET_KEY, token

    find_by! token_digest: digest
  end

  def self.authenticate_by_token(token)
    authenticate_by_token! token
  rescue ActiveRecord::RecordNotFound
    nil
  end

  # Add virtual token attribute to serializable attributes & exclude this 
  # token's HMAC digest
  def serializable_hash(options = nil)
    # .merge can't be used on nil so uses default 
    h = if options.blank? 
      super options 
    else
      super options.merge(except: 'token_digest')
    end

    h.merge! 'token' => token if token.present?
    h
  end

  private

  def generate_token_hmac_digest
    raise ActiveRecord::RecordInvalid, 'token is required' unless token.present?

    digest = OpenSSL::HMAC.hexdigest 'SHA256', HMAC_SECRET_KEY, token

    self.token_digest = digest
  end
end