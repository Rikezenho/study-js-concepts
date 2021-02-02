const Employee = require("./employee");
const Util = require("./util");

class Manager extends Employee {
    #bonuses = 2000
    get bonuses () {
        return Util.formatCurrency(this.#bonuses)
    }
    get netPay() {
        const sum = Util.unFormatCurrency(super.netPay) + Util.unFormatCurrency(this.bonuses)
        return Util.formatCurrency(sum)
    }
}

module.exports = Manager