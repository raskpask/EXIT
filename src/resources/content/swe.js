function getLanguage() {
    const lang = {
        button:{
            submit: "Skicka",
            add: "Lägg till",
            remove: "Ta bort"
        },
        access: {
            message: "Du har inte rättigheter för denna sidan! Logga in eller erhåll högre privileger."
        },
        home: {
            title: "Välkommen till EXIT!",
            paragraph0: "Detta system är till för studierektorer, examinatorer, handledare och studenter på KTH. Systemet håller koll på hur mycket examinatorer arbetar och vilka projekt de arbetar på. Det håller även på vilka examinatrorer som är tillgängliga för nya examenssarbeten och hur mycket tid en examinartorer har kvar på ett budgetår.",
            paragraph1: "När du loggar ut från systmet loggas hur endast ut från EXIT och inte från SAML. Om du vill logga ut från SAML (KTH) krävs det att du stänger ner till webbläsare.",
            paragraph2: "Om du har några frågor kring systemet finns några svar under hjälp sektionen."
        },
        footer: {
            title: "KTH Royal Institute of Technology 2020."
        },
        profile: {
            title: "Profil",
            paragraph0: "Denna sidan visar hur mpnga timmar som du ska lägga ner som handläggare och examinator detta året. Det visar även hur många timmar som finns kvar att spendera. " +
                "Vänligen lägg till område som du vill handleda projekt i.",
            competenceArea: "Kompetens",
            competenceAreaInfo: "Lägg till en generell kommentar eller din kompetens som ska synas för studenterna.",
            competenceAreaPlaceholder: "Lägg till din kompetens. Du kan beskriva det med ord eller bara skriva ett område.",
            totalExaminerHours: "Antal timmar som examinator",
            reamainingExaminerHours: "Antal timmar kvar som examinator.",
            totalSupervisorHours: "Antal timmar som handledare.",
            reamainingSupervisorHours: "Antal timmar kvar som handledare.",
            hours: " timmar.",
            edit: "Redigera",
            save: "Spara",
            fail: "Något gick fel, kunde inte ladda profilen.",
            budgetYearFail: "Något gick fel. Det kan vara att studierektorn inte har lagt till dig till detta budgetår.",
            saved: "Din kompetens var sparad.",
            saveFaild: "Något gick fel och din kompetens kunde inte bli sparad.",
            addComment: "Lägg till kommentar."

        },
        degreeProject: {
            company: "Företag",
            info: "Info",
            persons: "Personer",
            outDated: "Utdaterad",
            inProgess: "Aktuell",
            edit: "Redigera projekt",
            delete: "Ta bort",
            projectDeleted: "Projektet är borttaget!",
            projectDeletedFail: "Projekte kunde inte tas bort!",
            updateSuccess: "Projeketet är uppdaterat.",
            updateFail :"Projektet kunde inte updateras.",
            submit: "Skicka",
            student: "Student",
            supervisor: "Handledare",
            examiner: "Examinator",
            projectRole: "Projekt roll",
            pickSupervisor: "Välj handledare",
            supervisorPlaceholder: "Klicka på knappen för att se handledare",
            comments: "Kommentarer",
            comment: "Kommentarer om projeketet:",
            commentInfo: "Lägg till dina kommentarer här för att besrkiva något som hänt eller något annat som ska sparas.",

        },
        addDegreeProject: {
            title: "Lägg till projekt till mitt budgetår",
            paragraph0: "Denna sida andvänds för att lägga till ett porjekt till ditt budgetår. Den uppskattade tiden det projeket kommer att ta dras av från din återstående tid. Var noga med att ange om du är en handledare eller examinator.",
            numOfStudents: "Antal studenter",
            numOfStudentsPlaceholder: "Ange antal studenter som är med i projeket.",
            projectDescription: "Projekt beskrivning",
            projectDescriptionPlaceholder: "Fyll i information om projektet.",
            credits: "Projekt typ",
            creditsPlaceholder: "Ange projekets typ.",
            startDate: "Startdatum",
            startDatePlaceholder: "Klicka för att lägga till startdatum.",
            endDate: "Slutdatum",
            endDatePlaceholder: "Klicka för att lägga till slutdatum.",
            companyName: "Företagsnamn",
            companyNamePlaceholder: "Fyll i namnet på företaget",
            companyAddress: "Företagsadress",
            companyAddressPlaceholder: "Fyll i adressen till företaget",
            companyPhone: "Telefonnummer till företaget",
            companyPhonePlaceholder: "Fyll i telefonnummer till företaget",
            sumbit: "Lägg till projekt",
            today: "Idag",
            projectTitle: "Titel",
            projectTitlePlaceholder: "Fyll i titel till projektet",
            addStudent: "Lägg till student",
            removeStudent: "Ta bort student",
            studentName: "Studentnamn",
            studentNamePlaceholder: "Fyll i namnet på studenten",
            kthUsername: "KTH användarnamn",
            kthUsernamePlaceholder: "Fyll i KTH användarnamn.",
            supervisor: "Handledare (ändra startdatum för att se tillgängliga handledare)",
            supervisorPlaceholder: "Fyll i startdatum för att se tillgängliga användare.",
            added: "Projektet är tillagt till ditt budgetår.",
            fail: "FEL! Projektet var inte tillagt till ditt budgetår",
            getFail: "FEL! Kunde inte ladda handledare",
            pickSupervisor: "Välj handledare",
            bachleorProject: "Bachleor projekt",
            masterProject: "Master projekt",
            projectTitleInfo: "Lägg till titel till projektet",
            startDateInfo: "Fyll i startdatum till projeket.",
            endDateInfo: "Fyll i deadline till projeketet.",
            creditsInfo: "Välj om projeket är ett master eller bachelor projekt.",
            supervisorInfo: "Välj handledare, de tillgängliga kommer visas i listan.Var noga med att du valt rätt år när du väljer startdatum.",
            studentNameInfo: "Fyll i studentens namn. Namnet kommer sedan att visas i projeket. Det är inte obligatoriskt att lägga till ett namn dock.",
            kthUsernameInfo: "Fyll i KTH användarnamnet för studenten. En ny användare kommer att läggas till om användaren inte finns i systemet.",
            projectDescriptionInfo: "Beskriv projektet med dina egna ord. Du har max 1000 tecken.",
            companyNameInfo: "Fyll i namnet på företaget.",
            companyAddressInfo: "Fyll i adressen till företaget.",
            companyPhoneInfo: "Fyll i telefonummret till företaget.",
        },
        specifiedBudgetYears: {
            title: "Budget år",
            paragraph0: "Tabllen visar alla paranetrar för alla budget år.",
            paragraph1: "Budget år",
            budgetYear: "Budget år",
            masterHoursExaminer: "Master timmar examinator",
            masterHoursSupervisor: "Master timmar handledare",
            bachleorHoursExaminer: "Bachleor timmar examinator",
            bachleorHoursSupervisor: "Bachleor timmar handledare",
            masterHoursExaminerPlaceholder: "Antal timmar för examinator i master projekt",
            masterHoursSupervisorPlaceholder: "Antal timmar för handledare i master projekt",
            bachleorHoursExaminerPlaceholder: "Antal timmar för examinator i bachleor projekt",
            bachleorHoursSupervisorPlaceholder: "Antal timmar för handledare i bachleor projekt",
            totalTutoringHours: "Totlalt antal timmar",
            factor2: "Faktor två",
            factor3: "Faktor tre",
            factor4: "Faktor fyra",
            factor5: "Faktor fem",
            factor1: "Faktor ett",
            fail: "Något gick fel och budget år kunde inte laddas."
        },
        addBudgetYear: {
            title: "Lägg till budget år",
            paragraph0: "Här kan du lägga till bugdet år, spcificera hur många timmar osm en examinator ska lägga ner på ett projekt " +
                "och specifiera faktorer som används för att beräkna antal timmar för ett projekt. Håll musen över titeln för att få specifik information.",
            submit: "Skicka",
            budgetYearPlaceholder: "Fyll i budgetår",
            masterHoursPlaceholder: "Fyll i antal timmar för ett master projekt",
            bachleorHoursPlaceholder: "Fyll i antal timmar för ett bachleor projekt",
            totalTutoringHoursPlaceholder: "Fyll i totala antalet timmar",
            factor1Placeholder: "Faktor en studenter",
            factor2Placeholder: "Faktor två studenter",
            factor3Placeholder: "Faktor tre studenter",
            factor4Placeholder: "Faktor fyra studenter",
            factor5Placeholder: "Faktor fem studenter",
            added: "Budgetåret är tillagt i databasen.",
            fail: "Något gick fel! Budgetåret blev inte tillagt i databasen.",
            addExaminer: "Till till examinator",
            budgetYearInfo: "Ange budgetåret som du vill lägga till.",
            masterHoursExaminerInfo: "Fyll i standardvärde för ett masterprojekt som en examinator.",
            masterHoursSupervisorInfo: "Fyll i standardvärde för ett masterprojekt som en handledare.",
            bachleorHoursExaminerInfo: "Fyll i standardvärde för ett bachelorprojekt som en examinator.",
            bachleorHoursSupervisorInfo: "Fyll i standardvärde för ett bachelorprojekt som en handledare.",
            factor2Info: "Faktorn som beräknar tiden för ett projekt om det är två studenter.",
            factor3Info: "Faktorn som beräknar tiden för ett projekt om det är tre studenter.",
            factor4Info: "Faktorn som beräknar tiden för ett projekt om det är fyra studenter.",
            factor5Info: "Faktorn som beräknar tiden för ett projekt om det är fem studenter."
        },
        addExaminer: {
            title: "Lägg till examinator eller handledare",
            paragraph0: "Fyll i användarnamn på personen som du vill lägga till som examinator. Användarnamnet är samma som mailen fast utan \"@kth.se\".",
            kthUsername: "KTH användarnamn",
            kthUsernamePlaceholder: "Fyll i KTH användarnamn av examinatorn eller handledaren som du vill lägga till.",
            added: "Användaren var tillagt som examinator.",
            fail: "Något gick fel! Användaren var inte tillagt som examinator.",
            kthUsernameInfo: "Fyll i KTH användarnamn av personen du vill lägga till som examinator."

        },
        specifyTutoringHours: {
            title: "Ange undervisningstimmar",
            paragraph0: "Denna tabellen visar alla tillgängliga examinatoreri systemet. " +
                "Du kan lägga till en examinator till ett specifikt budgetår genom att lägga till " +
                "mail och ange timmar som en examinator ska arbeta " +
                "med ett projekt under det valda året. "+
                "Om användaren har namnet 'null null' har han/hon inte loggat in på sidan.",
            bugetYear: "Budgetår",
            budgetYearPlaceholder: "Fyll i budgetåret som du vill lägga till examinatorn eller examinatrorerna till.",
            username: "Användare",
            usernamePlaceholder: "KTH användare",
            examinerHours: "Examinatortimmar enligt budgetår",
            supervisorHours: "Handledningstimmar enligt budgetår",
            examinerHoursPlaceholder: "Antal timmar att vara examinator.",
            supervisorHoursPlaceholder: "Antal till att vara handledare.",
            getBudgetYearFail: "Något gick fel! Kunde inte ladda budgetår.",
            success: "Användaren/användarna blev INTE tillagda.",
            budgetYearInfo: "Välj ett år från listan som du vill lägga till examinatorer och handledare till.",
            usernameInfo: "Fyll i KTH användarnamn av examinator eller handledare du vill lägga till timmar till.",
            examinerHoursInfo: "Fyll i antal timmar användren ska spendera som examinator detta budgetår.",
            supervisorHoursInfo: "Fyll i antalet timmar som användaren ska spendera som handledare detta budgetår."
        },
        header: {
            home: "Hem",
            login: "Logga in",
            logout: "Logga ut",
            profile: "Profil",
            swe: "SV",
            eng: "ENG",
            kth: "KTH EECS Electrum EXIT",
            help: "Hjälp",
            availableExaminsers: "Tillgängliga examinatorer",
            addDegreeProject: "Lägg till examensarbete",
            myDegreeProjects: "Mina examensarbeten",
            addBudgetYear: "Lägg till budgetår",
            specifiedBudgetYears: "Budget år",
            addExaminer: "Lägg till examiantor",
            specifyTutoringHours: "Ange undervisningstimmar",
            addDirectorOfStudies: "Lägg till studierektor",
            directorsOfStudies: "Studierektorer",
            

        },
        help: {
            title: "Hjälp",
            paragraph0: "På denna sidan går det att hitta lösningar till problem av sysemet.",
            paragraph1: "Logga in på systemet.",
            paragraph2: "För att logga in på systemet krävs ett KTH konto. " +
                "Om du har ett konto men fortfarande inte kan logga är det troligvis något fel på externa system. " +
                "Om det är fallet bör du se till att du kan logga in på andra SAML tjänster (Antagning.nu)."
        },
        availableExaminers: {
            title: "Tillgängliga examinatorer",
            subtitle: "Denna tabellen visar alla tillgängliga examinatorer för det valda kalenderåret.",
            budgetYear: "Budgetår",
            firstName: "Förnamn",
            lastName: "Efternamn",
            email: "Mail",
            competenceArea: "Kompetens",
            fail: "Något gick fel! Kunde inte hämta examinatorer.",
            changeYear: "Byt år"
        },
        myDegreeProjects: {
            title: "Mina examensarbeten",
            paragraph0: "Denna tabellen visar alla dina examensarbeten. Om du klickar på info går det att se specifik information och hantera det valda projektet.",
            credits: "Högskolepoäng",
            degreeTitle: "Preliminär titel/beskrivning",
            numOfStudents: "Antal studenter",
            startDate: "Startdatum",
            endDate: "Deadline",
            project: "Projekt information",
            withinTimeLimit: "Inom deadline",
            fail: "Något gick fel! Kunde inte ladda dina projekt.",
            info: "Info"
        },
        directorsOfStudies: {
            title: "Studierektorer",
            paragraph0: "Denna tabellen visar alla studierektorer i systemet",
            lastName: "Efternamn",
            firstName: "Förnamn",
            email: "Mail",
            fail: "Något gick fel! Kunde inte ladda stuiderektorer."
        },
        addDirectorOfStudies: {
            title: "Lägg til studierektor",
            paragraph0: "Fyll i användarnamn på personen som du vill lägga till som stuiderektor. Användarnamnet är samma som emailen utan \"@kth.se\".",
            usernamePlaceholder: "Fyll i användarnamnet på personen som du vill lägga till som studierektor.",
            username: "Användarnamn",
            usernameInfo: "Fyll i KTH anvädndarnamn på personen som du vill lägga till som studierektor.",
            submit: "Skicka",
            added: "Användaren var tillagt som studierektor.",
            fail: "Något gick fel! Användaren var inte tillagt som studierektor.",
            getFail:"Något gick fel och användaren kunde INTE läggas till som studierektor."
        },
        general: {
            loading: "Laddar...",
            error: "Hoppsan något gick fel!",
            yes: "Ja",
            no: "Nej",
            email: "Mail",
            name: "Namn",
            sessionFail: "Du har varit inaktiv för länge vänligen logga in igen."
        },
        budgetYear: {
            getFail: "Något gick fel! Kunde inte ladda budgetår."
        }
    }
    return lang;
}
module.exports = {
    getLanguage,
}