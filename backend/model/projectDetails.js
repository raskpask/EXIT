module.exports = class ProjectDetails{

/**
 * 
 * @param {int} project_id - The project id
 * @param {int} number_of_students - The number of students in the project
 * @param {String} project_description - A description of the project
 * @param {int} credits - The amount of credits the project is worth
 * @param {Date} start_date - The date the project starts
 * @param {Date} end_date - The date the project ends
 * @param {boolean} in_progress - If the project is still ongoing
 * @param {boolean} out_of_date - If the project has passed the end date without being finished
 * @param {boolean} all_info_specified - If all the information of the project has been specified
 * @param {int} company The company the project is being done for. This is the ID, the other details have to be retrieved from the database
 * @param {int} company_contact - The user ID of the person at the company responsible for the project
 * @param {String} company_name - The name of the company
 * @param {String} company_address - The address of the company
 * @param {String} company_phone_number - The phone number of the company
 * @param {String} project_title -. The title of the project
 */
    constructor(project_id,number_of_students,project_title,project_description,credits,start_date,end_date,in_progress,out_of_date,all_info_specified,company,company_contact,company_name,company_address,company_phone_number){
        this.project_id = project_id;
        this.number_of_students = number_of_students;
        this.project_description = project_description;
        this.credits = credits;
        this.start_date = start_date;
        this.end_date = end_date;
        this.in_progress = in_progress;
        this.out_of_date = out_of_date;
        this.all_info_specified = all_info_specified;
        this.company = company;
        this.company_contact = company_contact;
        this.company_name = company_name;
        this.company_address = company_address;
        this.company_phone_number= company_phone_number;
        this.project_title = project_title;
    }
}