$(function(){
	var fileCont = $('#'+fileId);
     
    $(window).on('dragover', function () {
        return false; 
    });
    $(window).on('dragend', function () {
        return false; 
    });
    $(window).on('drop', function (e) {
        /* this.className = ''; */
        e.preventDefault();

        if(userName != '' && userGroup != ''){
            var file = e.originalEvent.dataTransfer.files[0],
                reader = new FileReader();

            // console.log(file);

            if(file.type === fileType && file.size < fileMaxSize*1024)
                reader.readAsText(file);
            else
                fileError();
          
            // Событие после загрузки файла
            reader.onload = function (event) {
                fileText = event.target.result;
                
                fileSuccess();

                // console.log(event.target);
                // console.log(fileText);
            };
        }

        return false;
    });


    function fileSuccess(){
        $('.name', fileCont).html('Файл&nbsp;загружен');
        fileCont.removeClass('error');
        fileCont.addClass('success');
    }

    function fileError(){
        $('.name', fileCont).html('Файл&nbsp;не&nbsp;загружен');
        fileCont.removeClass('success');
        fileCont.addClass('error');
    }
})