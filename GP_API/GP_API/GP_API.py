#import api.main
#This is only used to run the code in the cmd :), vercel will not use this
#if __name__ == '__main__':
    #api.main.app.run(debug=False)



password_length = 8
print(secrets.token_urlsafe(password_length))