$(document)
    .ready(function () {
	var list = [];
	var filtering = "all";
	const itemConstructor = item => `<li id=${item.id} class="${item.isComplete ? "checked" : ""}">
									<input name="done-todo" ${item.isComplete ? 'checked' : ""} type="checkbox" class="done-todo" />
									<span> ${item.name}</span> </li>`

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        // code to be implemented
		
		//add item
        $('#button').click(add);
		
		function add(){
			list.push({id: generateUUID(), name: $('input[name=ListItem]').val(), isComplete: false});
			$('input[name=ListItem]').val('');
			refreshList();
		}		
		
		//cross out item
        $(document).on('click', 'input[name=done-todo]', function (event) {
            $(this).parent().toggleClass('checked');
            list.find(item => item.id === $(this).parent()[0].id).isComplete = $(this).parent().hasClass('checked');
        });
		
		//edit clicked todo item
        $(document).on('click', 'li', function () {
			var clickedItem = $(this).children('span');
			clickedItem.attr('contentEditable', 'true')
            clickedItem.focus();
			clickedItem.keypress(function (event) {
                    if (event.keyCode == '13') {
                        clickedItem.attr('contentEditable', 'false');
                        clickedItem.blur();
                        list.find(item => item.id === $(this).parent()[0].id).name = $(this).text();
                        refreshList();
                    }
                });
        });

		//filters on-click event
		$('#filters li a').click(function (item) {
                filtering = $(this).data('filter');
                refreshList();
        });
		
		//update list
		function refreshList(){
			var filterList = item => [{filterKey: "all", output: true}, {filterKey: "complete", output: item.isComplete}, {filterKey: "active", output: !item.isComplete}]
										.find(item => item.filterKey == filtering).output;
			var orderlist = list.filter(filterList).map(item => itemConstructor(item));
			$('ol').html(orderlist);
		}
		
    });