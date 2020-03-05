function getLanguage() {
    const lang = {
        button:{
            submit: "Submit",
            add: "Add",
            remove: "Remove"
        },
        access: {
            message: "You do not have the access rights for this page! Login or get higher privilege from admin"
        },
        home: {
            title: "Welcome to EXIT!",
            paragraph0: "This is a system for directors of studies, examiners and students at KTH. It keeps track of how much of an examiners working hours are to be given to tutoring of degree projects, which examiners that are available to tutor degree projects, how much tutoring hours each examiner has left on the current budget year and each examiner's degree projects.",
            paragraph1: "When you log out of the system you only log out from EXIT. If you want to log out from KTH CAS (Central Authentication Service) you need to close the browser.",
            paragraph2: "If you have any problems with the system press the help button."
        },
        footer: {
            title: "KTH Royal Institute of Technology 2020."
        },
        profile: {
            title: "Profile",
            paragraph0: "This page shows how many tutoring hours you are supposed to use for tutoring of degree projects the current year and how many tutoring hours you have left. " +
                "Please specify a work area so that students can see what your main work area is.",
            competenceArea: "Area of competence",
            competenceAreaPlaceholder: "Enter you area of competence. You may describe it with words or just write the area.",
            remainingTutoringHours: "Remaining tutoring hours",
            totalTutoringHours: "Total amount of tutoring hours",
            hours: " hours.",
            edit: "Edit",
            save: "Save",
            fail: "Something went wrong, could not load profile."

        },
        degreeProject: {
            company: "Company",
            info: "Info",
            status: "Status",
            outDated: "Outdated",
            inProgess: "In progress",
            edit: "Edit project",
            delete: "Delete",
            projectDeleted: "The project was successfully deleted!",
            projectDeletedFail: "The project could not be deleted!",
            updateSuccess: "The projects was updated",
            updateFail :"The project could not be updated try again.",
            submit: "Submit"

        },
        addDegreeProject: {
            title: "Add degree project to my annual quota",
            paragraph0: "This page is used for adding a project to your annual quota. The estimated time the degree projct will take will be removed from your remaining time. Be sure to specify if you are a tutor or examiner of the project.",
            numOfStudents: "Number of students",
            numOfStudentsPlaceholder: "Specify number of students for the project.",
            projectDescription: "Project description",
            projectDescriptionPlaceholder: "Please fill in general information about the project.",
            credits: "Credits",
            creditsPlaceholder: "Enter the amount of credits for the project.",
            startDate: "Start date",
            startDatePlaceholder: "Press to enter start date.",
            endDate: "End date",
            endDatePlaceholder: "Press to enter end date.",
            companyName: "Company name",
            companyNamePlaceholder: "Enter the name of the company",
            companyAddress: "Company address",
            companyAddressPlaceholder: "Enter the address of the company",
            companyPhone: "Company telephone number",
            companyPhonePlaceholder: "Enter the telephone number of the company",
            sumbit: "Add project",
            today: "Today",
            projectTitle: "Title",
            projectTitlePlaceholder: "Enter the title of the project",
            addStudent: "Add student",
            removeStudent: "Remove student",
            studentName: "Student name",
            studentNamePlaceholder: "Enter full name of the student",
            kthUsername: "KTH username",
            kthUsernamePlaceholder: "Enter KTH username.",
            supervisor: "Supervisor",
            supervisorPlaceholder: "Enter the KTH username of the supervisor.",
        },
        specifiedBudgetYears: {
            title: "Specified budget years",
            paragraph0: "This table shows all parameters for all specified budget years.",
            paragraph1: "Budget years",
            budgetYear: "Budget year",
            masterHoursExaminer: "Master hours examiner",
            masterHoursSupervisor: "Master hours supervisor",
            bachleorHoursExaminer: "Bachleor hours examiner (two students)",
            bachleorHoursSupervisor: "Bachleor hours supervisor (two students)",
            masterHoursExaminerPlaceholder: "Amount of hours for examiner in master project",
            masterHoursSupervisorPlaceholder: "Amount of hours for supervisor in master project",
            bachleorHoursExaminerPlaceholder: "Amount of hours for examiner in bachleor project",
            bachleorHoursSupervisorPlaceholder: "Amount of hours for supervisor in bachleor project",
            totalTutoringHours: "Total tutoring hours",
            factor2: "Factor two",
            factor3: "Factor three",
            factor4: "Factor four",
            factor5: "Factor five",
            factor1: "Factor one",
            fail: "Something went wrong and the budget years could not be fetched."
        },
        addBudgetYear: {
            title: "Add budget year",
            paragraph0: "Here you can add a budget year, specify how many tutoring hours an examiner should use for tutoring degree projects " +
                "and specify factors that the hours are going to be multiplied with if the number of students exceeds one.",
            submit: "Submit",
            budgetYearPlaceholder: "Enter the year of the buget",
            masterHoursPlaceholder: "Enter amount of hours for a master project",
            bachleorHoursPlaceholder: "Enter amount of hours for a bachleor project",
            totalTutoringHoursPlaceholder: "Enter the total amount of tutoring hours",
            factor2Placeholder: "Factor two students",
            factor3Placeholder: "Factor three students",
            factor4Placeholder: "Factor four students",
            factor5Placeholder: "Factor five students",
            factor1Placeholder: "Factor one students",
            added: "The budget year was added to the database.",
            fail: "Something went wrong, the budget year was not added to the database.",
            addExaminer: "Add examiner"
        },
        addExaminer: {
            title: "Add examiner",
            paragraph0: "Please insert the username of the name of the person you want to add as a examiner. Do not include \"@kth.se\".",
            kthUsername: "KTH username",
            kthUsernamePlaceholder: "Enter the KTH username of the examiner you want to add",
            added: "The user was added as examiner.",
            fail: "Something went wrong the user was not added as a examiner."
        },
        specifyTutoringHours: {
            title: "Specify tutoring hours",
            paragraph0: "This table shows all available examiners in the system. " +
                "You can add an examiner to a specific budget year by choosing the budget year, " +
                "examiner mail and define the number of hours the examiner is supposed to use " +
                "to tutor degree projects during the selected budget year.",
            bugetYear: "Budget Year",
            budgetYearPlaceholder: "Enter the buget year you want to add the examiner/examiners to.",
            username: "Username",
            usernamePlaceholder: "KTH username.",
            examinerHours: "Examiner hours",
            supervisorHours: "Supervisor hours",
            examinerHoursPlaceholder: "Amount of hours to be examiner.",
            supervisorHoursPlaceholder: "Amount of hours to be supervisor."
        },
        header: {
            home: "Home",
            login: "Login",
            logout: "Logout",
            profile: "Profile",
            swe: "SWE",
            eng: "ENG",
            loginError: "Invaild password/username",
            kth: "KTH EECS Electrum EXIT",
            help: "Help",
            availableExaminsers: "Current available Examiners",
            addDegreeProject: "Add degree project to my annual quota",
            myDegreeProjects: "My degree projects",
            addBudgetYear: "Add budget year",
            specifiedBudgetYears: "Specified budget years",
            addExaminer: "Add examiner",
            specifyTutoringHours: "Specify tutoring hours",
            addDirectorOfStudies: "Add director of studies",
            directorsOfStudies: "Directors of studies",
            

        },
        help: {
            title: "Help",
            paragraph0: "At this page you can get help if you have problems with the system.",
            paragraph1: "Logging into the system.",
            paragraph2: "To be able to log into the system you need to have a valid KTH account. " +
                "If you have an account and you still can not log in, the problem is not in the KTH-EXIT system. " +
                "If that is the case, you need to contact KTH administration."
        },
        availableExaminers: {
            title: "Current available examiners",
            subtitle: "This table shows all available examiners for the current calendar year.",
            budgetYear: "Bugdet year ",
            firstName: "First name",
            lastName: "Last name",
            email: "Email",
            competenceArea: "Competence area",
            fail: "Something went wrong, could not fatch the examiners."
        },
        myDegreeProjects: {
            title: "My degree projects",
            paragraph0: "This table shows all of you existing degree projects. If you press a link you can view specific degree project information for a selected degree project or mark a degree project as finished/cancelled (this will remove the degree project from your view but not from the database).",
            credits: "Credits",
            degreeTitle: "Preliminary title/description",
            numOfStudents: "Number of students",
            startDate: "Start date",
            endDate: "End date",
            project: "Project information",
            withinTimeLimit: "Within time limit",
            fail: "Something went wrong could not load your projects.",
            info: "Info"
        },
        directorsOfStudies: {
            title: "Directors of studies",
            paragraph0: "This table shows all existing directors of studies in the system",
            lastName: "Last name",
            firstName: "First name",
            email: "Email",
            fail: "Something went wrong and the directors could not be fetched."
        },
        addDirectorOfStudies: {
            title: "Add director of studies",
            paragraph0: "Please insert the username of the name of the person you want to add as a director of studies. Do not include \"@kth.se\".",
            usernamePlaceholder: "Enter the username of the user you want to make as director of studies.",
            username: "Username",
            submit: "Submit",
            added: "The user was added as director of studies",
            fail: "Something went wrong and the user was not add as director of studies"
        },
        validationError: {
            emptyField: {
                message: "Please fill in this field"
            },
            noMatchPassword: {
                message: "Passwords do not match"
            },
            toLongField: {
                message: "FIELD is to long(maximum is MAXNUM characters)"
            },
            toShortField: {
                message: "FIELD is to short(minimum is MINNUM characters)"
            },
            notValidField: {
                message: "Please enter a valid FIELD"
            },
            invalidCharacters: {
                message: "FIELD contains invalid characters"
            },
            notUnicode: {
                message: "Please only use Unicode characters"
            },
            duplicateUsername: {
                message: "This username already exists, try another username"
            },
            notNumber: {
                message: "You must specify a  valid number"
            },
            competenceTypeNotChoosen: {
                message: "Pleace choose a compitence from the list"
            },
            alreadyHasApplication: {
                message: "You have already created a application. You may not create any more appications."
            },
            bothCompAndAvailMissing: {
                message: "Please specify a compitence and a availibility"
            },
            compMissing: {
                message: "Please specify a compitence"
            },
            availMissing: {
                message: "Please specify a availibility date"
            },
            availEmpty: {
                message: "Please give a valid availibility date"
            },
        },
        listApplications: {
            firstName: "First name",
            lastName: "Last name",
            applicationDate: "Application date",
            moreInfo: "Application info",
            info: "Info",
            competences: "Competences",
            applicationPeriod: "Application period",
            from: "From: ",
            to: "To: ",
            availability: "Availability",
            name: "Name",
            accept: "Accept",
            reject: "Reject",
            close: "Close",
            application: "Application",
            editedMessage: "This applicataion has already been edited by someone else!\n" +
                "The page will be reloaded to see the new status.",
            success: "The application has been changed",
            noApplications: "The filter you used has no matching applications",
            filter: "Filter"

        },
        apply: {
            sumbitError: "You did not use the correct input for the application so it could not be created. Please check the application and try again.",
            buttonCompetences: "Competence:",
            buttonDefaultValue: "Pick a competence",
            buttonAddCompetence: "Add competence",
            textYearsOfExperience: "Years of experience:",
            availabilityButton: "Add availibility",
            sumbitApplication: "Submit application",
            tableCompetence: [
                "Competence",
                "Years of experience"
            ],
            tableAvailability: [
                "Availability",
                "Start date",
                "End date",
                "Period "
            ],
        },

        user: [
            {
                name: "Username: ",
                placeholder: "Enter username"
            },
            {
                name: "Password: ",
                placeholder: "Enter Password",
            },
            {
                name: "Email: ",
                placeholder: "Enter Email"
            },
            {
                name: "Date of birth: ",
                placeholder: "Enter date of birth"
            },
            {
                name: "First Name: ",
                placeholder: "Enter first name"
            },
            {
                name: "Last Name: ",
                placeholder: "Enter last name"
            },
            {
                name: "Welcome "
            },
            {
                availability: "Availability",
                competence: "Competence",
                yearsOfExperience: "Years of experience",
                to: " to ",
                dateOfSubmission: "Date of submission: ",
                status: "Status: ",
                lastEdited: "Last edited:  ",
                firstName: "First name: ",
                lastName: "Last name: ",
                dateOfBirth: "Date of birth: ",
                info: "Info"
            },
            {
                status0: "Unhandled",
                status1: "Accepted",
                status2: "Rejected",
                statuselse: "Status Loading/Error"
            },
            {
                noApplicationMessage: "This is where your application will be displayed when you create one."
            }
        ],
        general: {
            loading: "Loading...",
            error: "oops something went wrong!"
        }
    }
    return lang;
}
module.exports = {
    getLanguage,
}