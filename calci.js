document.addEventListener('DOMContentLoaded', function () {
    var viewer = document.getElementById("viewer");
    var equals = document.getElementById("equals");
    var clear = document.getElementById("clear");
    var reset = document.getElementById("reset");
    var nums = document.querySelectorAll(".num");
    var ops = document.querySelectorAll(".ops");
    var theNum = "";
    var oldNum = "";
    var resultNum;
    var operator;

    function setNum() {
        if ((this.getAttribute("data-num") === "." && theNum.indexOf(".") === -1) || this.getAttribute("data-num") !== ".") {
            if (resultNum) {
                theNum = this.getAttribute("data-num");
                resultNum = "";
            } else {
                theNum += this.getAttribute("data-num");
            }

            viewer.innerHTML = theNum;
        }
    }

    function moveNum() {
        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-ops");
        equals.setAttribute("data-result", "");
    }

    function displayNum() {
        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

        switch (operator) {
            case "plus":
                resultNum = oldNum + theNum;
                break;

            case "minus":
                resultNum = oldNum - theNum;
                break;

            case "times":
                resultNum = oldNum * theNum;
                break;

            case "divided by":
                resultNum = oldNum / theNum;
                break;

            // other cases...

            default:
                resultNum = theNum;
        }

        if (!isFinite(resultNum)) {
            resultNum = "You broke it!";
            viewer.classList.add("broken");
            reset.classList.add("show");
        }

        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);
        oldNum = 0;
        theNum = resultNum;
    }

    for (var i = 0; i < nums.length; i++) {
        nums[i].onclick = setNum;
    }

    for (var i = 0; i < ops.length; i++) {
        ops[i].onclick = moveNum;
    }

    equals.onclick = displayNum;

    clear.onclick = function () {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
    };

    reset.onclick = function () {
        window.location.reload();
    };
});
