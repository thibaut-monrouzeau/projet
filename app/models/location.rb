class Location < ActiveRecord::Base
  before_validation :geocode
    
  def meteo 
     ForecastIO.forecast(self.latitude, self.longitude).currently
  end
  
  private
  def geocode
    places = Nominatim.search(self.ville).limit(1)
    place = places.first
    if place
      self.latitude = place.latitude
      self.longitude = place.longitude
    end
  end 
end