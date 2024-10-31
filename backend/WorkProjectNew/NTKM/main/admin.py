from django.contrib import admin
from .models import Problem, User, Sector, ObjectOfWork, ProblemType, ProblemStatus, Profile, File, Journal, Folder

admin.site.register(Problem)
admin.site.register(User)
admin.site.register(Sector)
admin.site.register(ProblemType)
admin.site.register(ProblemStatus)
admin.site.register(ObjectOfWork)
admin.site.register(File)
admin.site.register(Profile)
admin.site.register(Journal)
admin.site.register(Folder)
