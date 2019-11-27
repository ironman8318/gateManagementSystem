# Gate Management
<https://gate-management.herokuapp.com/>

A gate management entry system in which visitor enter his details and host gets a mail and a SMS regarding the visitor's details and after the meeting visitor gets a detaild report on the mail and SMS.

## Technologies Used - 
NodeJs,MongoDB,Express,Mongoose

## Installations Instructions
  **Pre-requisites** 
    1.Should hava a mongodb server running on the PC or a online mongodb database access.
    2.NodeJS should be installed on the system
  **Instructions**
    1.First clone this repository and then run command `npm install` ,it will download all the required dependencies.
    2.Then open any Browser window and open the following URL <localhost:3000>
### Details taken by the system
- Visitor's Name
- Visitor's Mobile
- Visitor's Email
- Visitor's CheckIn Time
- Visitor's CheckOut Time
- Host's Name
- Host's Mobile
- Host's Email

**Email Notifications** service is provided using the nodemailer package and gmail. 

**SMS notifications** Currently there is no free SMS API available , So SMS notifications are currenttly not available



