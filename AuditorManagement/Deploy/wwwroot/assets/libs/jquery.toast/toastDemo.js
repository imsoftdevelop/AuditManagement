(function ($) {
    showWariningToast = function (val) {
        resetToastPosition();
        $.toast({
            heading: '<i class=" icon-info jq-iconcol-warning px-2 py-1"></i> ไม่สามารถบันทึกได้ เนื่องจากข้อมูลไม่ถูกต้อง/ไม่ครบถ้วน',
            text: '<p class="jq-toast-text">1. ' + val + '</p>',
            showHideTransition: 'slide',
            icon: 'warning',
            loaderBg: '#ffcf55',
            position: 'top-center'
        })
    };
    showSuccessToast = function () {
        resetToastPosition();
        $.toast({
            heading: '<i class= "fa fa-check-circle jq-iconcol-success px-2 py-1" ></i> บันทึกข้อมูลสำเร็จ',
            text: '',
            showHideTransition: 'slide',
            icon: 'success',
            loaderBg: '#74ac18',
            position: 'top-center'
        })
    };
    showSuccessWorkToast = function () {
        resetToastPosition();
        $.toast({
            heading: '<i class= "fa fa-check-circle jq-iconcol-success px-2 py-1" ></i> เปลี่ยนสถานะสำเร็จ',
            text: '',
            showHideTransition: 'slide',
            icon: 'success',
            loaderBg: '#74ac18',
            position: 'top-center'
        })
    };
    showSuccessText = function (val) {
        resetToastPosition();
        $.toast({
            heading: '<i class= "fa fa-check-circle jq-iconcol-success px-2 py-1" ></i> ' + val,
            text: '',
            showHideTransition: 'slide',
            icon: 'success',
            loaderBg: '#74ac18',
            position: 'top-center'
        })
    };
    showDeleteSuccessToast = function () {
        resetToastPosition();
        $.toast({
            heading: '<i class= "fa fa-check-circle jq-iconcol-success px-2 py-1" ></i> ลบข้อมูลสำเร็จ',
            text: '',
            showHideTransition: 'slide',
            icon: 'success',
            loaderBg: '#74ac18',
            position: 'top-center'
        })
    };
    showErrorToast = function (val) {
        resetToastPosition();
        $.toast({
            heading: '<i class= " fa fa-ban jq-iconcol-error px-2 py-1" ></i> เกิดข้อผิดพลาดจากระบบ',
            text: '<p class="jq-toast-text">' + val + '</p>',
            showHideTransition: 'slide',
            icon: 'error',
            loaderBg: '#ed5564',
            position: 'top-center'
        })
    };
    resetToastPosition = function () {
        $('.jq-toast-wrap').removeClass('bottom-left bottom-right top-left top-right top-center'); // to remove previous position class
        $(".jq-toast-wrap").css({
            "top": "",
            "left": "",
            "bottom": "",
            "right": ""
        }); //to remove previous position style
    }
})(jQuery);