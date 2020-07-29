from locust import TaskSet, HttpLocust, task
import json


class UserBehaviorA(TaskSet):

    def on_start(self):
        response = self.client.post(
            '/auth/login', {"email": "sergio@correo.com", "password": "123"})
        self.accessToken = response.json()["result"]["accessToken"]

    @task(10)
    def list_users(self):
        self.client.get('/user',
                        headers={"Authorization": "Bearer {}".format(
                            self.accessToken)}
                        )

    @task(1)
    def list_roles(self):
        self.client.get('/role',
                        headers={"Authorization": "Bearer {}".format(self.accessToken)})


class StressA(HttpLocust):
    task_set = UserBehaviorA
    min_wait = 3000
    max_wait = 6000


class UserBehaviorB(TaskSet):

    def on_start(self):
        response = self.client.post(
            '/auth/login', {"email": "sergio@correo.com", "password": "123"})
        self.accessToken = response.json()["result"]["accessToken"]

    @task(6)
    def list_users(self):
        self.client.get('/user',
                        headers={"Authorization": "Bearer {}".format(
                            self.accessToken)}
                        )

    @task(2)
    def list_roles(self):
        self.client.get('/role',
                        headers={"Authorization": "Bearer {}".format(self.accessToken)})


class StressB(HttpLocust):
    task_set = UserBehaviorB
    min_wait = 3000
    max_wait = 6000
