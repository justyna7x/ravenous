const apiKey = 'IIWPNID2JyQo0CbQ00ELxecnPcKoBNVL_LAFpJTh-CNohX5iEikg6IHQ78YZijET0KJWAISl3edjV-HiJ5F-BuPpVtnO9_AvSQBnQ7Z8_Vw3UsrRSXGPX1wNQxgrZHYx'


const Yelp = {
    search(term, location, sortBy){

        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,{ 
            headers: {
             Authorization: `Bearer ${apiKey}` 
            }
         }).then((response)=>{
            return response.json().then((jsonResponse)=>{
                if (jsonResponse.businesses) {
                    return jsonResponse.businesses.map((business)=>{
                        return {
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.address1,
                            city: business.location.city,
                            state: business.location.state,
                            zipCode: business.location.zip_code,
                            category: business.categories[0].title,
                            rating: business.rating,
                            reviewCount: business.review_count
                        }

                    });
                }
            });
        });
    }
}

export default Yelp;