module.exports = class User{
    /**
     *Creates an instance of User.
     * @param {String} kth_username- The  KTH username of the user
     * @param {String} kth_email - KTH email of the user
     * @param {String} alt_email - Alternate email of the user
     * @param {String} first_name - Name of the user
     * @param {String} last_name - Surname of the user
     * @param {int} user_id - ID of the user
     * @param {int} user_type_id - Privilege level of the user
     */
    //constructor(kth_username,kth_email,alt_email,first_name,last_name,user_id,user_type_id){
    constructor(user_type_id,kth_email,alt_email,first_name,last_name,kth_username){
        this.kth_username = kth_username;
        this.kth_email = kth_email;
        this.alt_email = alt_email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_id = user_id;
        this.user_type_id = user_type_id;
    }
    display() {
        console.log(this.first_name + " " + this.last_name);
    }
}
