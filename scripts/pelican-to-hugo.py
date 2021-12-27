#!/usr/bin/env python3
#
# Pelican to Hugo v20180603
#
# Convert Markdown files using the pseudo YAML frontmatter syntax
# from Pelican to files using the strict YAML frontmatter syntax
# that Hugo and other static engines expect.
#
# Anthony Nelzin-Santos
# https://anthony.nelzin.fr
# anthony@nelzin.fr
#
# European Union Public Licence v1.2
# https://joinup.ec.europa.eu/collection/eupl/eupl-text-11-12

import os, os.path, sys, re

def main(argv):
    if len(argv) != 3:
        print(f"Usage: {argv[0]} <source_dir> <output_dir>")
        print(argv)
        exit(1)

    source_path = argv[1]
    dest_path = argv[2]

    if not os.path.exists(source_path):
        print("Source directory not found")
        exit(2)

    print(f"Converting files from {source_path} and saving to {dest_path}")
    convert_dir(source_path, dest_path)
    print(f"Converting complete")


def convert_dir(source_path, dest_path):
    dir_items = os.listdir(source_path)
    os.makedirs(dest_path, exist_ok=True)

    for entry in dir_items:
        full_source = os.path.join(source_path, entry)
        full_dest = os.path.join(dest_path, entry)

        if os.path.isdir(full_source):
            convert_dir(full_source, full_dest)
            continue

        file_name, file_extension = os.path.splitext(full_source)
        if file_extension not in ('.md', '.markdown') :
            print(f"Skipping file {full_source} as not a .md file")
            continue

        meta_lines = []
        content = ''
        meta_mode = True
        with open(full_source, 'rU') as in_file:
            for line in in_file:
                if meta_mode and line.strip() == '':
                    meta_mode = False
                    continue

                if meta_mode:
                    if not re.match('^[^:]+: ', line):
                        print(f'Unknown line found: {line}')
                        exit(1)
                    else:
                        meta_lines.append(line)
                else:
                    content += line

        with open(full_dest, 'w') as out_file:
            out_file.write('---\n')
            tag_line = None
            for line in meta_lines:
                if re.match('[tT]ags:', line):
                    tag_line = line
                else:
                    out_file.write(line)

            if tag_line is not None:
                tag_list = tag_line.split(':')[-1]
                tag_split = [t.strip() for t in tag_list.split(',')]
                line = 'Tags:\n' + '\n'.join([f' - {t}' for t in tag_split])
                out_file.write(line + '\n')

            out_file.write('---\n\n')
            out_file.write(content)

        print(f'{full_source} converted to {full_dest}.')





        # with open(full_source, 'rU') as fi, open(full_dest, 'w') as fo:
        #     for line in fi:
        #         # Add opening frontmatter delimiter before the title.
        #         line = re.sub(r'([tT]itle:)', r'---\n\1', line)
        #         # Add closing frontmatter delimiter after the tags.
        #         line = re.sub(r'([tT]ags: .*)$$', r'\1\n---', line)
        #         # Enclose the title in quotes.
        #         line = re.sub(r'[tT]itle: (.*)', r'Title: \1', line)
        #         # Change date formatting.
        #         line = re.sub(r'([dD]ate: \d{4}-\d{2}-\d{2}) (\d{2}:\d{2})', r'\1T\2:00Z', line)
        #         # Slow but insightful way to edit the tags.
        #         if re.match(r'[tT]ags: (.*)', line):
        #             tag_list = line.split(':')[-1]
        #             tag_split = [t.strip() for t in tag_list.split(',')]
        #             line = 'Tag:\n' + '\n'.join([f' - {t}' for t in tag_split])

        #             # # Output the new list of tags.
        #             # tag_plist = '\n- '.join(tag_split)
        #             # print(f'----- {tag_plist} ----')
        #             # # Insert a newline before the list.
        #             # tag_list = re.sub(r'tags: (.*)', r'tags: \n- \1', tag_plist)
        #             # # And enclose the tags in quotes.
        #             # line = re.sub(r'- (.*)', r'- "\1"', tag_list)
        #         fo.write(line)

        #     # Print a little something about the conversion.

# Run the script
main(sys.argv)
