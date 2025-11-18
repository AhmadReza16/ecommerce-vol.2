from rest_framework import permissions

class IsReviewOwner(permissions.BasePermission):
    """
    فقط صاحب ریویو اجازه ویرایش و حذف دارد.
    """
    def has_object_permission(self, request, view, obj):
        # SAFE METHODS مثل GET اجازه مشاهده دارند
        if request.method in permissions.SAFE_METHODS:
            return True
        # فقط صاحب ریویو اجازه ویرایش/حذف دارد
        return obj.user == request.user