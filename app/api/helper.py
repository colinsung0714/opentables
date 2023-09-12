def calculate_avg(restaurant):
    total_rating = sum([review.rating for review in restaurant.reviews])
    num_reviews = len(restaurant.reviews)
    return float(total_rating/num_reviews)