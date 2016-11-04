---
layout: post
title: "Typescript Preview on AppHarbor"
date: 2012-10-21 00:01
comments: true
categories: 
- typescript
---

So, this weekend a friend and I started working on a little side project and wanted to use 
Microsoft's new TypeScript language for our JS development.  We had also decided on using 
AppHarbor (a fantastic .net paas provider) to automatically deploy our code builds.  There 
were a few oddities that had to be fixed to allow this to work, and I hope to share with 
you the process that we went through to allow for typescript to be successfully deployed 
to an ASP.NET MVC app running on AppHarbor.

<!-- more --> 

## Typescript Installation  

1. Install VS 2012 (For my case I used Professional 2012)
2. Install the Typescript Preview (version 0.8.0.0)
3. Install the Visual Studio plugin if it didn't get successfully installed
    * Manually run the file TypeScriptLanguageService.vsix found at   %PROGRAM_FILES%\Microsoft SDKs\TypeScript\0.8.0.0\

## Project Setup

At this point we now have visual studio and a developer box setup to create our new project.  
The project template that I used was an ASP.NET MVC 4 web application.  After creating the 
project file you will need to edit the .csproj file to have some tags to run the tsc 
(TypeScript compiler) on the ts files found in your project.  We will also need to copy the 
tsc compiler to our solution, so that we can commit it to the repository 
(required only for AppHarbor building).

Create a folder in a subdirectory of your solution and copy the following files from the 
TypeScript install directory  

* tsc.exe
* tschost.dll (not sure if it is actually required)
* tsc.js

Noting the above directories location relative to the solution's root, you will then edit 
the projects csproj file using your favorite editor and add the below lines

        <Target Name="BeforeBuild">
          <Exec Command="&quot;$(SolutionDir)<TypescriptDirectory>\tsc&quot; @(TypeScriptCompile ->'&quot;%(fullpath)&quot;', ' ')" />
        </Target>

This new command will cause the typescript compiler to run before each build and compile 
the .ts files to .js  

*Note: The reason for copying the compiler over is so that it will be able to be executed on 
the AppHarbor machines without the need for them to install the dependency.* 

## Finishing

So, at this point you should have an application that will build your typescript files on any 
machine that can build a regular csproj project.  When adding the ts file to your project, 
use the visual studio "Add New Item" option and select a typescript file, if you try to 
manually add it with the extension you will need to add the compile command to the projects 
csproj file as well (example below).

        <TypeScriptCompile Include="TSScripts\app.ts" />

