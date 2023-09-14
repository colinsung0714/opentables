def calculate_avg(restaurant):
    total_rating = sum([review.rating for review in restaurant.reviews])
    num_reviews = len(restaurant.reviews)
    if num_reviews == 0:
        return 0
    return float(total_rating/num_reviews)

def total_review_num(restaurant):
    return len(restaurant.reviews)

def to_lower(menu_type):
    return menu_type.title()