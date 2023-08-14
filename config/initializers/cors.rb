Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3001' # Change this to the allowed origin(s), e.g., 'https://yourfrontenddomain.com'
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true # Set this to true if you need to send cookies or authentication headers
  end
end
