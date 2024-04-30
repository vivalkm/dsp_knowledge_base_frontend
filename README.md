# DSP CPPH Finance Knowledge Base

This project is an AI-powered knowledge base system that allows users to ask questions via a web application and receive answers based on preloaded private documents. The system leverages various AWS services and large language models (LLMs) to provide accurate and relevant responses. It follows a Retrieval Augmented Generation (RAG) architecture, where relevant document chunks are first retrieved from a vector database, and then an LLM is used to generate a summarized response based on the retrieved information.

## Features

-   User-friendly web interface for submitting questions
-   Backend API powered by AWS API Gateway and AWS Lambda
-   Document storage and management using AWS S3
-   Vector database for efficient retrieval of relevant document chunks (AWS OpenSearch)
-   Response summarization using Claude 3 LLM
-   Document embedding generation using Amazon Titan Embeddings G1 Model
-   Retrieval Augmented Generation (RAG) architecture for efficient and accurate question answering
-   Responsive layout for different screen sizes

## Architecture Overview

The project follows a client-server architecture with the following components:

1. **Frontend**: Developed using React, Material UI, HTML, and CSS. This component provides the user interface for submitting questions and displaying the generated responses.

2. **Backend API**: Built with AWS API Gateway and AWS Lambda. The API Gateway handles incoming HTTP requests from the frontend and invokes the corresponding Lambda function. The Lambda function parses the query parameters, retrieves relevant document chunks from the vector database using a RAG architecture, and invokes the LLM models to generate a summarized response based on the retrieved information.

3. **Document Storage**: AWS S3 is used to store the private documents that form the knowledge base.

4. **Vector Database**: AWS OpenSearch is employed as a vector database to store and efficiently retrieve relevant document chunks based on their embeddings.

5. **LLM Models**: The project utilizes two LLM models:

    - **Claude 3**: Responsible for generating a concise summary based on the retrieved document chunks.
    - **Amazon Titan Embeddings G1 Model**: Used to convert document chunks into embeddings, enabling efficient vector similarity searches in the vector database.

6. **Retrieval Augmented Generation (RAG)**: The RAG architecture is employed to efficiently retrieve relevant document chunks from the vector database based on the user's query, and then leverage the LLM to generate a summarized response based on the retrieved information.

<img src='https://github.com/vivalkm/dsp-kb-frontend/blob/master/Design_Diagram.png' title='Design' width='' alt='Design' />

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://github.com/vivalkm/dsp-kb-frontend/blob/master/walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with LICEcap
