#!/usr/bin/env python3

import sys
import re

filename = str(sys.argv[1])
outfile = re.sub(r'.sql', '.sql.out', filename)

def main( file ):
    with open( outfile, "w" ) as o:
        for line in file.split("\n"):
            # ADD target_id column
            line = re.sub( r'\(`image_name`', '(`target_id`, `image_name`', line)
            # SET target_id
            line = re.sub( r'^\(', '(1, ', line )
            # REPLACE single quotes with double quotes and ADD new line
            line = re.sub( r'\'' ,'"', line )
            # WRITE line to output file
            o.write( line + "\n" )

# open original file
with open(filename) as f:
    print("Running...")
    main( file=f.read() )
    print("Done.")