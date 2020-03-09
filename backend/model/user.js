module.exports = class User{
    /**
     *Creates an instance of User.
     * @param {String} kth_username- The  KTH username of the user
     * @param {String} email - Email of the user
     * @param {String} first_name - Name of the user
     * @param {String} last_name - Surname of the user
     * @param {int} user_id - ID of the user
     * @param {int} user_type_id - Privilege level of the user
     * @param {string} phone_number - The user's phone number
     */
    //constructor(kth_username,kth_email,alt_email,first_name,last_name,user_id,user_type_id){
    constructor(user_type_id,email,first_name,last_name,kth_username, phone_number, user_id){
        this.kth_username = kth_username;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_id = user_id;
        this.user_type_id = user_type_id;
        this.phone_number = phone_number;
    }
    display() {
        console.log(this.first_name + " " + this.last_name);
    }
}
