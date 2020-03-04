module.exports = class BudgetYear{
    /**
     *Creates an instance of BudgetYear.
     * @param {int} year
     * @param {int} bachleor_hours
     * @param {int} master_hours
     * @param {int} total_tutoring_hours
     * @param {double} factor_1
     * @param {double} factor_2
     * @param {double} factor_3
     * @param {double} factor_4
     * @param {double} factor_5
     */
    constructor(year,bachelor_hours,master_hours,total_tutoring_hours,factor_1,factor_2,factor_3,factor_4,factor_5){
        this.year = year;
        this.bachelor_hours = bachelor_hours;
        this.master_hours = master_hours;
        this.total_tutoring_hours = total_tutoring_hours
        this.factor_1 = factor_1;
        this.factor_2 = factor_2;
        this.factor_3 = factor_3;
        this.factor_4 = factor_4;
        this.factor_5 = factor_5;
    }
}
