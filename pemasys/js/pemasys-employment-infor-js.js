
function openMediumModal() {
    $('#mediumModal').modal('show');
}
function closeModal(){
    $(document).find('.child-modal').on('hidden.bs.modal', function () {
        $('body').addClass('modal-open');
    });
}
$(document).ready(function(){
    function resetLargeModal() {
        $('#myForm')[0].reset(); // Reset the form fields
        $('#message-form').empty(); // Clear the message-form div content
      }

    $('#largeModal').on('hidden.bs.modal', function(e) {
        resetLargeModal();
    });
    function resetMediumModal() {
        $('#form')[0].reset(); // Reset the form fields
        $('#message-form').empty(); // Clear the message-form div content
    }

    $('#largeModal').on('hidden.bs.modal', function(e) {
        resetMediumModal();
    });
    $(document).on('click', '.add', function() {
        resetLargeModal();
        resetMediumModal();
        $('#largeModalLabel').html('Add Employment Information');

        $('#largeModal').modal('show');
    });
    $(document).on('click', '.fa-edit', function() {
        resetLargeModal();
        resetMediumModal();
        $('#largeModalLabel').html('Update Employment Information');

        $('#largeModal').modal('show');
    });
    $(document).on('click', '.fa-eye', function() {
        resetLargeModal();
        resetMediumModal();
        $('#largeModalLabel').html('View Employment Information');

        $('#largeModal').modal('show');
    });
});