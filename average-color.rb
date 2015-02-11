FILE_TYPE = 'png'

`convert ./emojis-#{FILE_TYPE}/*.#{FILE_TYPE} -resize 1x1\! txt:- | awk 'NR % 2 == 0' > ./emojis-#{FILE_TYPE}/colors.txt`

File.open('emoji-colors.js', 'w') do |f|
  f.puts "var emojiColors = ["
  File.open("./emojis-#{FILE_TYPE}/colors.txt").read.each_line{ |l| f.puts("'#{l.split(' ')[2][0..6]}',") }
  f.puts "]"
end
