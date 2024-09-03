from django.contrib import admin
from .models import Problem, User, Sector, ObjectOfWork, ProblemType, ProblemStatus

admin.site.register(Problem)
admin.site.register(User)
admin.site.register(Sector)
admin.site.register(ProblemType)
admin.site.register(ProblemStatus)
admin.site.register(ObjectOfWork)
