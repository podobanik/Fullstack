from rest_framework import permissions


class IsAdminOrIsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)

        return bool(request.user and request.user.is_staff) or (obj.user == request.user)


