Github pages for Michael Wright
===========================================

This is my personal blog site that is created for me to go over technology tools, languages
and other items.    

This new blog was migrated from jekyll to pelican so that I could utilize the jupyter 
notebook tool.    

## Setup (Hugo)

Be sure to download the latest hugo release from github (https://github.com/gohugoio/hugo/releases)
and place the `hugo` executable in the `bin` directory

## Setup

To setup this system you will need to make sure that everything is installed and working 
correctly.   

        # Make sure we have pulled the submodules
        git submodule init
        git submodule update

        # Install python3 virtualenv
        virtualenv -p python3 venv

        # Activate the virtualenv
        # Bash: source venv/bin/activate
        . venv/bin/activate.fish
        
        # Install the requirements for the setup
        pip install -r requirements.txt

        # Build the content using pelican
        pelican content

        # Start the pelican server to preview 
        cd content
        python -m pelican.server

        # View in the browser
        open localhost:8000

You should now have all the tools necessary create new notebook entries using jupyter.  

**Note**: on Ubuntu you will also need to have a couple of other libraries.   

        apt install libfreetype6-dev libpng3

## Create Entry

To create an entry you will want to start a new notebook and create an associated metadata file.   

        # Open the notebook
        cd content
        jupyter blog-notebook

        # Create the notebook name (aka 'blog-post.ipynb')
        touch blog-post.ipynb-meta 

        # Add this content to the meta file
        Title: <title>
        Slug: <slug>
        Date: 2016-01-01 00:00
        Category: <category>
        Tags: tag1 tag2
        Author: <author>
        Summary: <summary>

## Other Languages

There are _hopefully_ going to be a number of different languages or patterns that I will go over
in the course of writing my blog. Some of these will have official Jupyter support while others will 
not have the corresponding support.   

To find out if a language will have Jupyter support see the list of supported kernels that can be
found [here](https://github.com/ipython/ipython/wiki/IPython-kernels-for-other-languages)    

For all other languages I will use embedded gist entries to attempt to accomplish the same task.    
        
## References

* https://www.dataquest.io/blog/how-to-setup-a-data-science-blog/



