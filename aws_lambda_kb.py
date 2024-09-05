import json
import boto3

client_kb = boto3.client('bedrock-agent-runtime')
ASK_RAW_PATH = "/ask"

def lambda_handler(event, context):
    print(f'Boto3 version: {boto3.__version__}')
    if event['path'] == ASK_RAW_PATH:
        print("Start request for ask")
        user_prompt = event['queryStringParameters']['prompt']
        response = client_kb.retrieve_and_generate(
            input={
                'text': user_prompt
            },
            retrieveAndGenerateConfiguration={
                'knowledgeBaseConfiguration': {
                    'knowledgeBaseId': 'P2S4P6MZLZ',
                    'modelArn': 'anthropic.claude-3-sonnet-20240229-v1:0',
                    "retrievalConfiguration": { 
                        "vectorSearchConfiguration": { 
                            "numberOfResults": 10
                        }
                    }
                },
                'type': 'KNOWLEDGE_BASE'
            },
        )
        response_full = response["citations"]
        return {'statusCode': 200,
                'headers': {
                            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,x-amz-content-sha256",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "GET,OPTIONS"
                            },
                'body': json.dumps(response_full)
                }
