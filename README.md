# Mass_Email_E_Biz
Repository for the E-Business module, tasked with building a Mass Email detector. This application exists as a gmail plugin that interfaces with a backend django enviornment. This readme.md will get you started on how to install and run the application.

How to run: 
  - front end email client will be released shortly, with full instructions available on release
 

## Notes for further development
How does it work?
This project is split up into two sections
 - back end
 - g suite front end
To get started with developing this project clone this repository and follow the steps below to edit the files included in this repository

## Installing Backend for Development
1. Install python, pip and virtualenv, all of this can be done from the python website : https://www.python.org/downloads/
To check pthon is installed simply go to your terminal and type:
```sh
python3
```
If a window showing your python version number, you're all good to go. To get out of this window simply enter 
```sh
exit()
```

2. Once python is installed there are a few things you should do to get yourself up and running
```sh
mkdir <project-name>
cd <project-name>
virtualenv venv
source venv/bin/activate
git clone https://github.com/cheethas/Mass_Email_E_Biz
cd Mass_Email_E_Biz/backend/api
pip3 install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate --run-syncdb
python3 manage.py createsuperuser
```
From there, create your own super-user and you're all set to get developing!
```sh
python3 manage.py runserver
```
will create a local deployment of django on 127.0.0.1:8000 that can be accessed from your browser to debug

## Working with google clasp to edit front end
1. Clasp is written in node.js and is distributed through the npm tool, so to get running you have to have node.js installed first, instructions on how to do that can be found here: https://nodejs.org/en/download/
Select your version then return to the next step (make sure npm is installed).

2. Now we will be able to install clasp.
```sh
npm install @google/clasp -g
```
Now clasp commands are available from anywhere on your computer

3. Login to clasp
```sh
clasp login
```
This will take you to a page to log in with your google account, this is how google saves your work.

4. Open in clasp
```sh
clasp open
```
will open a code editor where your clasp files can be saved. If you prefer to edit offline you can simply flush the items in your folder with 
```sh
clasp push
```
or inversly pull changes stored online on clasp to your local folder with
```sh
clasp pull
```



