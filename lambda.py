import json
import os
import requests
def lambda_handler(event, context):
    body = json.loads(event['body'])
    given_value = body['Value']
    given_verif = body["Verif"]
    if given_verif == os.environ['Verif']:
        req = "https://login.salesforce.com/services/oauth2/token"
        params =(('grant_type','password'),
        ('client_id',os.environ['client_id']),
        ('client_secret',os.environ['client_secret']),('username',os.environ['username']),
        ('password',os.environ['password']))
        try:
            j = requests.post(req,params=params)
            token = json.loads(j.text)['access_token']
            q = {"q":"SELECT Name,Address,Phone,Email FROM Lead WHERE Name LIKE '%"+given_value+"%' OR Phone LIKE '%"+given_value+"%' OR Email Like '%"+given_value+"%'" }       
            link = "https://na59.salesforce.com/services/data/v39.0/query"
            resp = requests.get(link,params=q,headers={"Authorization":"Bearer {}".format(token)})
        except:
            return {
                'statusCode': 200,
                'headers': {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                'body': []
            }
        
        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': json.dumps(resp.text)
        }
    else:
        return {
            'statusCode':400,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
        }