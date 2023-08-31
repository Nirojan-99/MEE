from Utils.token import decode_token


def authenticate(request, app):
    if request.headers.get("token") is None:
        return False

    data = decode_token(request.headers.get("token"), app)
    return data['user_id']
